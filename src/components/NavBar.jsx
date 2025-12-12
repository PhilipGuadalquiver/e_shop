import React, { useState } from "react";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import "./NavBar.css";

const NavBar = ({ currentPage, setCurrentPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  const navItems = ["Home", "Shop", "Deals", "Contact"];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo" onClick={() => handleNavClick("Home")} style={{ cursor: 'pointer' }}>
          E-Shop
        </div>

        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className={`nav-item ${currentPage === item ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item);
              }}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input type="text" placeholder="Search products..." className="search-input" />
        </div>

        <div className="icons">
          <div
            className="cart-icon-wrapper"
            onClick={() => handleNavClick("Cart")}
            style={{ cursor: "pointer", position: "relative" }}
          >
            <ShoppingCart className="icon" size={24} />
            {getCartItemsCount() > 0 && (
              <span className="cart-badge">{getCartItemsCount()}</span>
            )}
          </div>
          <User className="icon" size={24} />
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className={`mobile-nav-item ${currentPage === item ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item);
                }}
              >
                {item}
              </a>
            ))}
            <a
              href="#"
              className={`mobile-nav-item ${currentPage === "Cart" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("Cart");
              }}
            >
              Cart ({getCartItemsCount()})
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
