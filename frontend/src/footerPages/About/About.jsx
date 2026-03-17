import React from 'react';
import './about.css';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
const About = () => {
    return (
        <>
            <Header />
            <Navbar />
            <div className="about-page">
                <div className="about-hero">
                    <div className="container">
                        <h1 className="about-title">About Our E-Commerce Journey</h1>
                        <p className="about-subtitle">Building the future of online shopping, one customer at a time</p>
                    </div>
                </div>

                <div className="about-content">
                    <div className="container">
                        <div className="about-grid">
                            <div className="about-text">
                                <h2>Our Story</h2>
                                <p>
                                    Founded with a vision to revolutionize online shopping, our e-commerce platform
                                    brings you the best products from around the world. We believe in quality,
                                    authenticity, and exceptional customer service.
                                </p>
                                <p>
                                    From humble beginnings to serving millions of customers worldwide, our journey
                                    has been driven by innovation and a passion for excellence in e-commerce.
                                </p>
                            </div>
                            <div className="about-stats">
                                <div className="stat-card">
                                    <h3>10M+</h3>
                                    <p>Happy Customers</p>
                                </div>
                                <div className="stat-card">
                                    <h3>50+</h3>
                                    <p>Countries Served</p>
                                </div>
                                <div className="stat-card">
                                    <h3>100K+</h3>
                                    <p>Products Available</p>
                                </div>
                            </div>
                        </div>

                        <div className="mission-section">
                            <h2>Our Mission</h2>
                            <p>
                                To provide an unparalleled shopping experience by offering high-quality products,
                                competitive prices, and exceptional customer service while embracing innovation
                                and sustainability.
                            </p>
                        </div>

                        <div className="values-section">
                            <h2>Our Values</h2>
                            <div className="values-grid">
                                <div className="value-card">
                                    <div className="value-icon">✓</div>
                                    <h3>Quality First</h3>
                                    <p>We never compromise on the quality of our products and services.</p>
                                </div>
                                <div className="value-card">
                                    <div className="value-icon">❤️</div>
                                    <h3>Customer Focus</h3>
                                    <p>Our customers are at the heart of everything we do.</p>
                                </div>
                                <div className="value-card">
                                    <div className="value-icon">⚡</div>
                                    <h3>Innovation</h3>
                                    <p>We continuously evolve to bring you the best shopping experience.</p>
                                </div>
                                <div className="value-card">
                                    <div className="value-icon">🌱</div>
                                    <h3>Sustainability</h3>
                                    <p>Committed to environmentally responsible business practices.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;