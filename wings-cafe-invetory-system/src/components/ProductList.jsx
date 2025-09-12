import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = ({ products, fetchProducts }) => {
    const [filter, setFilter] = useState('');

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: 'DELETE'
                });
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(filter.toLowerCase()) ||
        product.category.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="product-list">
            <div className="list-header">
                <h2>Product List</h2>
                <Link to="/add-product" className="btn-primary">Add New Product</Link>
            </div>

            <div className="filter-section">
                <input
                    type="text"
                    placeholder="Filter by name or category..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="filter-input"
                />
            </div>

            <table className="products-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id} className={product.quantity < 5 ? 'low-stock-row' : ''}>
                            <td>
                                {product.images && product.images[0] ? (
                                    <img
                                        src={`http://localhost:5000${product.images[0]}`}
                                        alt={product.name}
                                        className="product-thumbnail"
                                        onError={(e) => {
                                            if (e.target) {
                                                e.target.style.display = 'none';
                                                if (e.target.nextSibling) {
                                                    e.target.nextSibling.style.display = 'block';
                                                }
                                            }
                                        }}
                                    />
                                ) : (
                                    <div className="no-image-placeholder">No Image</div>
                                )}
                            </td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td>M{product.price.toFixed(2)}</td>
                            <td className={product.quantity < 5 ? 'low-stock' : ''}>
                                {product.quantity}
                            </td>
                            <td>
                                <Link to={`/edit-product/${product.id}`} className="btn-edit">Edit</Link>
                                <button onClick={() => handleDelete(product.id)} className="btn-delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;