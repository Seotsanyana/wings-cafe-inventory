import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Sales from './components/Sales';
import Inventory from './components/Inventory';
import Reporting from './components/Reporting';
import Navbar from './components/Navbar';
import './App.css';

// Professional Horizontal Blue Wave Footer Component
const Footer = () => {
  return (
    <div className="wave-footer-container">
      <svg
        className="wave-footer-svg"
        viewBox="0 0 1920 450"
        preserveAspectRatio="none"
        style={{ width: '100vw', height: '450px', display: 'block' }}
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>

        {/* Wave layers */}
        <path
          d="M0,96L80,112C160,128,320,160,480,160C640,160,800,128,960,122.7C1120,117,1280,139,1440,138.7C1600,139,1760,117,1840,117.3L1920,138.7L1920,450L0,450Z"
          fill="url(#waveGradient)"
          fillOpacity="0.9"
        />
        <path
          d="M0,192L80,197.3C160,203,320,213,480,213.3C640,213,800,203,960,186.7C1120,171,1280,149,1440,165.3C1600,181,1760,235,1840,234.7L1920,149.3L1920,450L0,450Z"
          fill="url(#waveGradient)"
          fillOpacity="0.7"
        />
        <path
          d="M0,256L80,240C160,224,320,192,480,181.3C640,171,800,181,960,197.3C1120,213,1280,235,1440,234.7C1600,235,1760,213,1840,197.3L1920,160L1920,450L0,450Z"
          fill="url(#waveGradient)"
        />

        {/* Horizontal Footer Content */}
        <foreignObject x="0" y="140" width="1920" height="310">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            className="wave-footer-content-horizontal"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '100%',
              color: 'white',
              textAlign: 'center',
            }}
          >
            {/* Top Row: 3 columns */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
              }}
            >
              {/* Brand Section */}
              <div>
                <h2 style={{ fontWeight: 'bold', fontSize: '18px', color: '#c5c5c5ff' }}>
                  WINGS CAFE INVENTORY SYSTEM
                </h2>
                <p style={{ fontSize: '14px' }}>
                  Professional inventory management solution
                </p>
                <p style={{ fontSize: '14px' }}>
                  <a href="https://www.wingscafe.com" style={{ color: 'white' }}>


                  </a>
                </p>
                <p style={{ fontSize: '14px' }}>Phone: +266 609001127</p>
              </div>

              {/* Contact Section */}
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '16px' }}>CONTACT</h3>
                <p style={{ fontSize: '14px' }}>
                  Email: nansystem@wingscafe.com
                </p>
                <p style={{ fontSize: '14px' }}>Phone: (555) 123-CAFE</p>
              </div>

              {/* Hours Section */}
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '16px' }}>HOURS</h3>
                <p style={{ fontSize: '14px' }}>Mon-Fit: 7am-9pm</p>
                <p style={{ fontSize: '14px' }}>Sat-Sun: 8am-10pm</p>
              </div>
            </div>

            {/* Bottom Copyright */}
            <div style={{ marginTop: '20px' }}>
              <p style={{ fontSize: '13px' }}>
                © 2025 Winga Cafe. All rights reserved.
              </p>
            </div>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

function App() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchSales = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sales');
      const data = await response.json();
      setSales(data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Dashboard products={products} />} />
            <Route
              path="/products"
              element={<ProductList products={products} fetchProducts={fetchProducts} />}
            />
            <Route
              path="/add-product"
              element={<ProductForm fetchProducts={fetchProducts} products={products} />}
            />
            <Route
              path="/edit-product/:id"
              element={<ProductForm fetchProducts={fetchProducts} products={products} />}
            />
            <Route
              path="/sales"
              element={
                <Sales
                  products={products}
                  fetchProducts={fetchProducts}
                  fetchSales={fetchSales}
                />
              }
            />
            <Route path="/inventory" element={<Inventory products={products} />} />
            <Route path="/reporting" element={<Reporting products={products} sales={sales} />} />
          </Routes>
        </div>
        {/* Updated Footer with horizontal wave design */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;