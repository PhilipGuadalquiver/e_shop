import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './Deals.css';

const Deals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        // Simulate deals by adding discount to products
        const deals = data.slice(0, 12).map((product, index) => ({
          ...product,
          originalPrice: product.price,
          discount: [20, 30, 40, 50, 25, 35][index % 6],
          price: product.price * (1 - [0.2, 0.3, 0.4, 0.5, 0.25, 0.35][index % 6]),
        }));
        setProducts(deals);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`${product.title} added to cart!`);
  };

  if (loading) {
    return (
      <div className="deals-loading">
        <div className="loading-spinner"></div>
        <p>Loading amazing deals...</p>
      </div>
    );
  }

  return (
    <div className="deals-page">
      <div className="deals-hero">
        <div className="deals-hero-content">
          <h1>🔥 Exclusive Deals</h1>
          <p>Limited time offers! Don't miss out on these incredible savings.</p>
          <div className="deal-badge">Up to 50% OFF</div>
        </div>
      </div>

      <div className="deals-section">
        <h2 className="section-title">Special Offers</h2>
        <div className="deals-grid">
          {products.map((product) => (
            <div key={product.id} className="deal-card">
              <div className="deal-badge-small">-{product.discount}%</div>
              <div className="deal-image-container">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="deal-info">
                <h3 className="deal-title">{product.title}</h3>
                <p className="deal-category">{product.category}</p>
                <div className="deal-pricing">
                  <span className="deal-original-price">${product.originalPrice.toFixed(2)}</span>
                  <span className="deal-price">${product.price.toFixed(2)}</span>
                </div>
                <div className="deal-rating">
                  <span>⭐ {product.rating?.rate || 'N/A'}</span>
                  <span>({product.rating?.count || 0})</span>
                </div>
                <button
                  className="deal-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="newsletter-section">
        <div className="newsletter-content">
          <h2>Get Exclusive Deals</h2>
          <p>Subscribe to our newsletter and never miss a deal!</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;

