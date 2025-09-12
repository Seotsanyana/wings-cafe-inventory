import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-image">
                {product.images && product.images[0] ? (
                    <img src={product.images[0]} alt={product.name} />
                ) : (
                    <div className="no-image">No Image</div>
                )}
            </div>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <p className="price">M{product.price.toFixed(2)}</p>
                <p className={`quantity ${product.quantity < 5 ? 'low-stock' : ''}`}>
                    Stock: {product.quantity}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;