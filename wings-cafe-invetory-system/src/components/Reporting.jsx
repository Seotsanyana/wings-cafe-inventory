import React from 'react';
import './Reporting.css';

const Reporting = ({ products, sales = [] }) => {
    // Ensure sales is an array
    const safeSales = Array.isArray(sales) ? sales : [];

    // Calculate report data
    const totalProducts = products.length;
    const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const lowStockCount = products.filter(p => p.quantity < 5).length;

    // Proper category breakdown with case-insensitive grouping
    const categoryBreakdown = products.reduce((acc, product) => {
        if (!product.category || product.category.trim() === '') {
            const uncategorized = 'Uncategorized';
            acc[uncategorized] = (acc[uncategorized] || 0) + 1;
            return acc;
        }

        const normalizedCategory = product.category
            .trim()
            .toLowerCase()
            .replace(/\b\w/g, c => c.toUpperCase());

        acc[normalizedCategory] = (acc[normalizedCategory] || 0) + 1;
        return acc;
    }, {});

    // Get low stock products (quantity < 5)
    const lowStockProducts = products.filter(p => p.quantity < 5);

    // Calculate total sales per category
    const salesByCategory = safeSales.reduce((acc, sale) => {
        const category = sale.category ? sale.category.trim().toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) : 'Uncategorized';
        acc[category] = (acc[category] || 0) + sale.total;
        return acc;
    }, {});

    // Calculate total sales overall
    const totalSales = safeSales.reduce((sum, sale) => sum + sale.total, 0);

    return (
        <div className="reporting-container">
            <h2>Inventory Reports</h2>

            <div className="reports-grid">
                <div className="report-card">
                    <h3>Summary</h3>
                    <div className="report-item">
                        <span>Total Products:</span>
                        <span>{totalProducts}</span>
                    </div>
                    <div className="report-item">
                        <span>Total Inventory Value:</span>
                        <span>M{totalInventoryValue.toFixed(2)}</span>
                    </div>
                    <div className="report-item">
                        <span>Low Stock Items:</span>
                        <span className={lowStockCount > 0 ? 'warning' : ''}>
                            {lowStockCount}
                        </span>
                    </div>
                </div>

                <div className="report-card">
                    <h3>Categories</h3>
                    {Object.entries(categoryBreakdown)
                        .sort(([catA], [catB]) => catA.localeCompare(catB))
                        .map(([category, count]) => (
                            <div key={category} className="report-item">
                                <span>{category}:</span>
                                <span>{count}</span>
                            </div>
                        ))
                    }
                </div>

                <div className="report-card">
                    <h3>Low Stock Alert</h3>
                    {lowStockProducts.length > 0 ? (
                        lowStockProducts.map(product => (
                            <div key={product.id} className="report-item warning">
                                <span>{product.name}</span>
                                <span>{product.quantity} left</span>
                            </div>
                        ))
                    ) : (
                        <p className="no-alert">No low stock items</p>
                    )}
                </div>

                <div className="report-card">
                    <h3>Sales by Category</h3>
                    {Object.entries(salesByCategory).length > 0 ? (
                        <>
                            {Object.entries(salesByCategory)
                                .sort(([catA], [catB]) => catA.localeCompare(catB))
                                .map(([category, total]) => (
                                    <div key={category} className="report-item success">
                                        <span>{category}:</span>
                                        <span>M{total.toFixed(2)}</span>
                                    </div>
                                ))
                            }
                            <div className="report-divider" />
                            <div className="total-sales">
                                <span>Total Sales:</span>
                                <span>M{totalSales.toFixed(2)}</span>
                            </div>
                        </>
                    ) : (
                        <p className="no-data">No sales data available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reporting;
