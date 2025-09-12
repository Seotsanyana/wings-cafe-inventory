import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <h1 className="nav-logo">Wings Cafe Inventory</h1>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/products" className="nav-link">Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/add-product" className="nav-link">Add Product</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/low-stock" className="nav-link">Low Stock</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;