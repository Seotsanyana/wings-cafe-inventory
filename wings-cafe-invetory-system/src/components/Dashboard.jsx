import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ products }) => {
    const totalProducts = products.length;
    const lowStockProducts = products.filter(p => p.quantity < 5).length;
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    // Group products by category
    const productsByCategory = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    return (
        <div className="dashboard-container">
            <h1>Dashboard Overview</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Products</h3>
                    <p className="stat-number">{totalProducts}</p>
                    <Link to="/products" className="stat-link">View All Products</Link>
                </div>

                <div className="stat-card warning">
                    <h3>Low Stock Alert</h3>
                    <p className="stat-number">{lowStockProducts}</p>
                    <Link to="/products" className="stat-link">Check Inventory</Link>
                </div>

                <div className="stat-card success">
                    <h3>Total Inventory Value</h3>
                    <p className="stat-number">M{totalValue.toFixed(2)}</p>
                    <span className="stat-subtitle">Current stock value</span>
                </div>
            </div>

            <div className="recent-section">
                <h2>Available Products</h2>
                {Object.entries(productsByCategory).map(([category, products]) => (
                    <div key={category} className="category-section">
                        <h3 className="category-title">{category}</h3>
                        <div className="recent-products-grid">
                            {products.map(product => (
                                <div key={product.id} className="dashboard-product-card">
                                    <div className="dashboard-product-image">
                                        {product.images && product.images.length > 0 && product.images[0] ? (
                                            <img
                                                src={`${product.images[0].startsWith('http') ? product.images[0] : 'http://localhost:5000' + product.images[0]}`}
                                                alt={product.name}
                                                onError={(e) => {
                                                    if (e.target) {
                                                        e.target.style.display = 'none';
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <div className="dashboard-no-image">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="dashboard-product-info">
                                        <h3>{product.name}</h3>
                                        <p className="dashboard-product-category">{product.category}</p>
                                        <p className="dashboard-product-price">M{product.price.toFixed(2)}</p>
                                        <p className="dashboard-product-stock">
                                            Stock: {product.quantity} units
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
