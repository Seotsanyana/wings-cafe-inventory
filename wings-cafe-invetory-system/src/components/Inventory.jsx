import React, { useState } from 'react';
import './Inventory.css';

const Inventory = ({ products }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', ...new Set(products.map(p => p.category))];
    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="inventory-container">
            <h2>Inventory Management</h2>

            <div className="inventory-controls">
                <div className="form-group">
                    <label>Filter by Category</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="inventory-grid">
                {filteredProducts.map(product => (
                    <div key={product.id} className="inventory-card">
                        <h4>{product.name}</h4>
                        <p className="category">{product.category}</p>
                        <p className="price">M{product.price.toFixed(2)}</p>
                        <p className={product.quantity < 5 ? 'quantity low' : 'quantity'}>
                            {product.quantity} in stock
                        </p>
                        {product.quantity < 5 && (
                            <span className="low-stock-badge">Low Stock!</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inventory;