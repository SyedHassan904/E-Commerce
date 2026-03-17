import React from 'react';
import './insights.css';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const Insights = () => {
    const insightCategories = [
        {
            icon: "📊",
            title: "Market Trends",
            description: "Latest industry insights and consumer behavior patterns",
            articles: 24
        },
        {
            icon: "🛒",
            title: "E-commerce Strategy",
            description: "Best practices for online retail and digital transformation",
            articles: 18
        },
        {
            icon: "📱",
            title: "Mobile Commerce",
            description: "Optimizing for the growing mobile shopping experience",
            articles: 12
        },
        {
            icon: "🌍",
            title: "Global Expansion",
            description: "Strategies for international growth and cross-border commerce",
            articles: 15
        }
    ];

    const featuredInsights = [
        {
            title: "The Future of Personalization in E-commerce",
            excerpt: "How AI and machine learning are revolutionizing customer experiences.",
            category: "Technology",
            readTime: "8 min read",
            date: "March 18, 2024"
        },
        {
            title: "Sustainable Commerce: Consumer Demand for Eco-Friendly Options",
            excerpt: "Understanding the shift towards environmentally conscious shopping.",
            category: "Sustainability",
            readTime: "6 min read",
            date: "March 15, 2024"
        },
        {
            title: "Optimizing Checkout: Reducing Cart Abandonment Rates",
            excerpt: "Proven strategies to improve conversion and reduce lost sales.",
            category: "Conversion",
            readTime: "10 min read",
            date: "March 12, 2024"
        }
    ];

    const dataPoints = [
        { percentage: "73%", label: "of consumers prefer brands that personalize shopping experiences" },
        { percentage: "68%", label: "increase in mobile commerce sales year-over-year" },
        { percentage: "45%", label: "of shoppers start product searches on Amazon instead of Google" },
        { percentage: "82%", label: "of consumers read online reviews before making purchases" }
    ];

    return (
        <>
            <Header />
            <Navbar />
            <div className="insights-page">
                <div className="insights-hero">
                    <div className="container">
                        <h1 className="insights-title">Insights & Research</h1>
                        <p className="insights-subtitle">Data-driven insights to power your e-commerce strategy</p>
                    </div>
                </div>

                <div className="insights-content">
                    <div className="container">
                        <div className="intro-section">
                            <h2>Stay Ahead with Data-Driven Insights</h2>
                            <p>
                                Access the latest research, trends, and analysis to make informed decisions
                                and drive your e-commerce business forward.
                            </p>
                        </div>

                        <div className="stats-section">
                            <h2>Key Industry Statistics</h2>
                            <div className="stats-grid">
                                {dataPoints.map((stat, index) => (
                                    <div key={index} className="stat-card">
                                        <div className="stat-percentage">{stat.percentage}</div>
                                        <div className="stat-label">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="categories-section">
                            <h2>Explore by Category</h2>
                            <div className="categories-grid">
                                {insightCategories.map((category, index) => (
                                    <div key={index} className="category-card">
                                        <div className="category-icon">{category.icon}</div>
                                        <h3>{category.title}</h3>
                                        <p>{category.description}</p>
                                        <div className="article-count">
                                            <span>{category.articles} Articles</span>
                                        </div>
                                        <button className="explore-category-btn">Explore</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="featured-section">
                            <h2>Featured Insights</h2>
                            <div className="featured-grid">
                                {featuredInsights.map((insight, index) => (
                                    <article key={index} className="insight-card">
                                        <div className="insight-header">
                                            <span className="insight-category">{insight.category}</span>
                                            <span className="insight-meta">{insight.readTime}</span>
                                        </div>
                                        <h3 className="insight-title">{insight.title}</h3>
                                        <p className="insight-excerpt">{insight.excerpt}</p>
                                        <div className="insight-footer">
                                            <span className="insight-date">{insight.date}</span>
                                            <button className="read-insight-btn">Read Insight</button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <div className="newsletter-section">
                            <div className="newsletter-content">
                                <h2>Get Insights Delivered</h2>
                                <p>
                                    Subscribe to our newsletter and receive the latest e-commerce insights,
                                    research, and trends directly in your inbox.
                                </p>
                                <div className="newsletter-form">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="newsletter-input"
                                    />
                                    <button className="subscribe-btn">Subscribe</button>
                                </div>
                                <p className="newsletter-note">
                                    No spam, unsubscribe at any time. Read our <a href="#">Privacy Policy</a>.
                                </p>
                            </div>
                        </div>

                        <div className="research-section">
                            <h2>In-Depth Research</h2>
                            <div className="research-content">
                                <div className="research-item">
                                    <div className="research-icon">📚</div>
                                    <div className="research-details">
                                        <h3>2024 E-commerce Trends Report</h3>
                                        <p>Comprehensive analysis of emerging trends and consumer behaviors shaping online retail.</p>
                                        <button className="download-report-btn">Download Report</button>
                                    </div>
                                </div>
                                <div className="research-item">
                                    <div className="research-icon">📈</div>
                                    <div className="research-details">
                                        <h3>Global Market Analysis</h3>
                                        <p>Detailed insights into international e-commerce opportunities and challenges.</p>
                                        <button className="download-report-btn">Download Report</button>
                                    </div>
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

export default Insights;