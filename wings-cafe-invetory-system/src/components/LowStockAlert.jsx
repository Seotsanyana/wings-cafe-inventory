import React from 'react';
import { Link } from 'react-router-dom';

const LowStockAlert = ({ lowStockProducts }) => {
    return (
        <div className="low-stock-alert">
            <h2>Low Stock Alert</h2>

            {lowStockProducts.length === 0 ? (
                <p className="no-alerts">No low stock items. Everything looks good!</p>
            ) : (
                <div>
                    <p className="alert-count">
                        You have {lowStockProducts.length} product(s) with low stock.
                    </p>

                    <table className="low-stock-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Current Stock</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lowStockProducts.map(product => (
                                <tr key={product.id} className={product.quantity === 0 ? 'out-of-stock' : 'low-stock'}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td className={product.quantity === 0 ? 'out-of-stock' : 'low-stock'}>
                                        {product.quantity}
                                    </td>
                                    <td>
                                        <Link to={`/edit-product/${product.id}`} className="btn-edit">Restock</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="action-section">
                <Link to="/add-product" className="btn-primary">Add New Product</Link>
                <Link to="/products" className="btn-secondary">View All Products</Link>
            </div>
        </div>
    );
};

export default LowStockAlert;