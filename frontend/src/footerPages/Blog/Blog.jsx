import React from 'react';
import './blog.css';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: "The Future of E-Commerce: Trends to Watch in 2024",
            excerpt: "Discover the emerging technologies and consumer behaviors shaping online shopping.",
            date: "March 15, 2024",
            category: "Industry Insights",
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "Sustainable Shopping: How We're Reducing Our Carbon Footprint",
            excerpt: "Learn about our initiatives to make e-commerce more environmentally friendly.",
            date: "March 12, 2024",
            category: "Sustainability",
            readTime: "4 min read"
        },
        {
            id: 3,
            title: "Customer Experience: The Key to E-Commerce Success",
            excerpt: "Why exceptional customer service matters more than ever in online retail.",
            date: "March 8, 2024",
            category: "Business Strategy",
            readTime: "6 min read"
        },
        {
            id: 4,
            title: "Mobile Commerce: Optimizing for the On-the-Go Shopper",
            excerpt: "Best practices for creating seamless mobile shopping experiences.",
            date: "March 5, 2024",
            category: "Technology",
            readTime: "7 min read"
        }
    ];

    return (
        <>
            <Header />
            <Navbar />
            <div className="blog-page">
                <div className="blog-hero">
                    <div className="container">
                        <h1 className="blog-title">Our Blog</h1>
                        <p className="blog-subtitle">Insights, trends, and stories from the world of e-commerce</p>
                    </div>
                </div>

                <div className="blog-content">
                    <div className="container">
                        <div className="blog-grid">
                            {blogPosts.map(post => (
                                <article key={post.id} className="blog-card">
                                    <div className="blog-card-header">
                                        <span className="blog-category">{post.category}</span>
                                        <span className="blog-read-time">{post.readTime}</span>
                                    </div>
                                    <h2 className="blog-card-title">{post.title}</h2>
                                    <p className="blog-card-excerpt">{post.excerpt}</p>
                                    <div className="blog-card-footer">
                                        <span className="blog-date">{post.date}</span>
                                        <button className="read-more-btn">Read More</button>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="newsletter-section">
                            <h2>Stay Updated</h2>
                            <p>Get the latest e-commerce insights delivered to your inbox</p>
                            <div className="newsletter-form">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="newsletter-input"
                                />
                                <button className="newsletter-btn">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Blog;