import React, { useState } from 'react';
import './Sales.css';

const Sales = ({ products, fetchProducts, fetchSales }) => {
    const [saleData, setSaleData] = useState({
        productId: '',
        quantity: 1
    });

    const handleSale = async (e) => {
        e.preventDefault();
        const product = products.find(p => p.id === parseInt(saleData.productId));

        if (!product) {
            alert('Please select a product');
            return;
        }

        if (product.quantity < saleData.quantity) {
            alert(`Not enough stock. Only ${product.quantity} available.`);
            return;
        }

        try {
            // Update product quantity
            const updatedProduct = {
                ...product,
                quantity: product.quantity - saleData.quantity
            };

            await fetch(`http://localhost:5000/api/products/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });

            // Record the sale (you might want to save this to a separate sales.json)
            const saleRecord = {
                product: product.name,
                category: product.category,
                quantity: saleData.quantity,
                total: product.price * saleData.quantity,
                date: new Date().toISOString()
            };

            await fetch('http://localhost:5000/api/sales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(saleRecord)
            });

            alert(`Sale recorded successfully! Total: M${saleRecord.total.toFixed(2)}`);
            setSaleData({ productId: '', quantity: 1 });
            fetchProducts(); // Refresh product list
            if (fetchSales) fetchSales(); // Refresh sales data
        } catch (error) {
            console.error('Error recording sale:', error);
        }
    };

    return (
        <div className="sales-container">
            <h2>Record Sale</h2>

            <form onSubmit={handleSale} className="sales-form">
                <div className="form-group">
                    <label>Select Product</label>
                    <select
                        value={saleData.productId}
                        onChange={(e) => setSaleData({ ...saleData, productId: e.target.value })}
                        required
                    >
                        <option value="">Choose a product</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.name} (Stock: {product.quantity})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        min="1"
                        value={saleData.quantity}
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setSaleData({ ...saleData, quantity: isNaN(val) ? 1 : val });
                        }}
                        required
                    />
                </div>

                <button type="submit" className="btn-primary">
                    Record Sale
                </button>
            </form>
        </div>
    );
};

export default Sales;