import { useState } from 'react';
import './App.css';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Deals from './pages/Deals';
import Contact from './pages/Contact';
import Cart from './pages/Cart';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {
    switch (currentPage) {
      case 'Shop':
        return <Shop />;
      case 'Deals':
        return <Deals />;
      case 'Contact':
        return <Contact />;
      case 'Cart':
        return <Cart />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <CartProvider>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </CartProvider>
  );
};

export default App;
