import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useCart } from '../context/CartContext';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Home.css';

const Home = ({ setCurrentPage }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { addToCart } = useCart();

    const images = [
        'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?w=1600', // Watch
        'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?w=1600', // T-Shirt
        'https://images.pexels.com/photos/219563/pexels-photo-219563.jpeg?w=1600'  // Bags
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products?limit=6');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Shop Smarter, Live Better</h1>
                    <p>Discover exclusive deals on the latest trends, all in one place.</p>
                    <button 
                        className="shop-now"
                        onClick={() => setCurrentPage && setCurrentPage('Shop')}
                    >
                        Shop Now
                    </button>
                </div>
                <div className="hero-image">
                    <img src={images[currentIndex]} alt="Shopping Banner" className="fade-in" />
                </div>
            </section>

            {/* Featured Products - Carousel */}
            <section className="home-products">
                <h2>Featured Products</h2>
                {loading ? (
                    <p>Loading products...</p>
                ) : (
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={3}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        breakpoints={{
                            320: { slidesPerView: 1 }, // Mobile
                            768: { slidesPerView: 2 }, // Tablet
                            1024: { slidesPerView: 3 } // Desktop
                        }}
                        className="products-carousel"
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className="product-item">
                                    <div className="product-image">
                                        <img src={product.image} alt={product.title} />
                                    </div>
                                    <div className="product-details">
                                        <h3 className="product-title">{product.title}</h3>
                                        <p className="product-price">${product.price.toFixed(2)}</p>
                                        <button 
                                            className="buy-now"
                                            onClick={() => {
                                                addToCart(product, 1);
                                                alert(`${product.title} added to cart!`);
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </section>

            {/* Why Shop With Us */}
            <section className="why-shop">
                <h2>Why Shop With Us?</h2>
                <div className="why-shop-container">
                    <div className="feature">
                        <img src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png" alt="Free Shipping" />
                        <h3>Free Shipping</h3>
                        <p>Enjoy fast and free shipping on all orders.</p>
                    </div>
                    <div className="feature">
                        <img src="https://cdn-icons-png.flaticon.com/512/3523/3523063.png" alt="Secure Payments" />
                        <h3>Secure Payments</h3>
                        <p>100% secure payment methods for a worry-free shopping experience.</p>
                    </div>
                    <div className="feature">
                        <img src="https://cdn-icons-png.flaticon.com/512/1053/1053219.png" alt="24/7 Support" />
                        <h3>24/7 Support</h3>
                        <p>Need help? Our team is available anytime to assist you.</p>
                    </div>
                </div>
            </section>

            {/* Customer Reviews */}
            <section className="reviews">
                <h2>What Our Customers Say</h2>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    className="reviews-carousel"
                >
                    <SwiperSlide>
                        <div className="review">
                            <p>"Amazing products and super fast delivery! Highly recommend this store!"</p>
                            <h4>- Sarah L.</h4>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="review">
                            <p>"The best shopping experience I've ever had. Excellent quality and great prices."</p>
                            <h4>- John D.</h4>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="review">
                            <p>"Customer service is outstanding! Love shopping here."</p>
                            <h4>- Emily R.</h4>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>
            <footer className="footer">
                <div className="footer-top">
                    <div className="footer-section brand">
                        <h3>E-Shop</h3>
                        <p>Shop smarter, live better. Discover top-quality products at unbeatable prices.</p>
                    </div>
                    <div className="footer-section links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Shop</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-section support">
                        <h4>Customer Service</h4>
                        <ul>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Shipping & Returns</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div className="footer-section social">
                        <h4>Follow Us</h4>
                        <div className="social-icons">
                            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Facebook" /></a>
                            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Twitter" /></a>
                            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733635.png" alt="Instagram" /></a>
                            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733614.png" alt="LinkedIn" /></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 E-Shop. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
