import React, { useState } from "react";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./NavBar.css"; // Import external CSS file



const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">E-Shop</div>

        <div className="nav-links">
          {["Home", "Shop", "Deals", "Contact"].map((item) => (
            <a key={item} href="#" className="nav-item">
              {item}
            </a>
          ))}
        </div>

        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input type="text" placeholder="Search products..." className="search-input" />
        </div>

        <div className="icons">
          <ShoppingCart className="icon" size={24} />
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
            {["Home", "Shop", "Deals", "Contact"].map((item) => (
              <a key={item} href="#" className="mobile-nav-item">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
