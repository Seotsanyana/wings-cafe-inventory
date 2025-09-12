import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductForm.css';

const ProductForm = ({ fetchProducts, products }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
        images: Array(5).fill('')
    });

    // Comprehensive image mapping for all products
    const productImageMap = {
        // Beverages
        'coffee': '/images/products/Coffee.jpg',
        'bottled water': '/images/products/Bottled-Water.jpg',
        'tea': '/images/products/Tea.jpg',
        'energy drink': '/images/products/Energy-Drink.jpg',
        'liquid fruit': '/images/products/Liquid-fruit.jpg',

        // Food
        'sandwich': '/images/products/Sandwich.jpg',
        'burgers': '/images/products/Burgers.jpg',
        'lunch meal': '/images/products/pork.jpg',
        'fried fish': '/images/products/Fried-fish.jpg',

        // Snacks
        'potato chips': '/images/products/Potato-Chips.jpg',
        'popcorn': '/images/products/Popcorn.jpg',
        'fat-cakes': '/images/products/fat-cakes.jpg',
        'doritos': '/images/products/Doritos.jpg',
        'fries': '/images/products/Fries.jpg',

        // Fruits
        'bananas': '/images/products/Banana.jpg',

        // Alternative names and variations
        'chips': '/images/products/Potato-Chips.jpg',
        'crisps': '/images/products/Potato-Chips.jpg',
        'fish': '/images/products/Fried-fish.jpg',
        'burger': '/images/products/Burgers.jpg',
        'meal': '/images/products/pork.jpg',
        'pap & pork': '/images/products/pork.jpg',
        'fruit': '/images/products/Liquid-fruit.jpg',
        'drink': '/images/products/Energy-Drink.jpg',
        'water': '/images/products/Bottled-Water.jpg',
        'banana': '/images/products/Banana.jpg'
    };

    const getImageForProduct = (productName) => {
        const normalizedName = productName.toLowerCase().trim();

        // Direct match
        if (productImageMap[normalizedName]) {
            return productImageMap[normalizedName];
        }

        // Partial match - check if any key is contained in the product name
        for (const [key, imagePath] of Object.entries(productImageMap)) {
            if (normalizedName.includes(key)) {
                return imagePath;
            }
        }

        // Default fallback
        return '/images/products/default.jpg';
    };

    useEffect(() => {
        if (isEditing && products.length > 0) {
            const productToEdit = products.find(product => product.id === parseInt(id));
            if (productToEdit) {
                setFormData({
                    name: productToEdit.name,
                    description: productToEdit.description,
                    category: productToEdit.category,
                    price: productToEdit.price.toString(),
                    quantity: productToEdit.quantity.toString(),
                    images: productToEdit.images || Array(5).fill('')
                });
            }
        }
    }, [id, isEditing, products]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Automatically assign image when product name changes
        if (name === 'name' && value.trim()) {
            const assignedImage = getImageForProduct(value);
            const newImages = [...formData.images];
            newImages[0] = assignedImage;
            setFormData(prev => ({
                ...prev,
                images: newImages
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure image is assigned based on product name
        let finalImages = [...formData.images];
        if (!finalImages[0] && formData.name.trim()) {
            finalImages[0] = getImageForProduct(formData.name);
        }

        const productData = {
            name: formData.name,
            description: formData.description,
            category: formData.category,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity),
            images: finalImages.filter(url => url && url.trim() !== '')
        };

        try {
            if (isEditing) {
                await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData)
                });
            } else {
                await fetch('http://localhost:5000/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData)
                });
            }
            fetchProducts();
            navigate('/products');
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <div className="product-form-container">
            <h2>{isEditing ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-textarea"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price (M)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="0"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>



                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        {isEditing ? 'Update Product' : 'Add Product'}
                    </button>
                    <button type="button" onClick={() => navigate('/products')} className="btn-secondary">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
