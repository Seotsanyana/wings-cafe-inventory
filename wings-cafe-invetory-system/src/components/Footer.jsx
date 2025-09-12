import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="wings-footer">
            <div className="wings-footer-content">
                <div className="wings-footer-brand">
                    <h3>WINGS CAFE</h3>
                    <p>Serving the finest coffee since 2010</p>
                </div>

                <div className="wings-footer-links">
                    <a href="#">Menu</a>
                    <a href="#">Locations</a>
                    <a href="#">About Us</a>
                    <a href="#">Contact</a>
                </div>

                <div className="wings-footer-social">
                    <a href="#" aria-label="Facebook">📱</a>
                    <a href="#" aria-label="Instagram">📸</a>
                    <a href="#" aria-label="Twitter">🐦</a>
                </div>
            </div>

            <div className="wings-footer-bottom">
                <p>© 2023 Wings Cafe. All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
        </footer>
    );
};

export default Footer;
