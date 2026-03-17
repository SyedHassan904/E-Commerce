import React from 'react';
import './commerce.css';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const Commerce = () => {
    const commerceFeatures = [
        {
            icon: "🛒",
            title: "Online Store",
            description: "Create beautiful, customizable online stores that convert visitors into customers.",
            features: ["Drag & Drop Builder", "Mobile-Optimized", "SEO-Friendly", "100+ Templates"]
        },
        {
            icon: "💳",
            title: "Payment Processing",
            description: "Secure payment processing with support for multiple currencies and payment methods.",
            features: ["Global Payments", "One-Click Checkout", "Fraud Protection", "Subscription Billing"]
        },
        {
            icon: "🚚",
            title: "Shipping & Fulfillment",
            description: "Streamlined shipping solutions with real-time rates and automated fulfillment.",
            features: ["Carrier Integration", "Real-time Rates", "Order Tracking", "Returns Management"]
        },
        {
            icon: "📦",
            title: "Inventory Management",
            description: "Smart inventory tracking with automated stock alerts and multi-location support.",
            features: ["Real-time Sync", "Low Stock Alerts", "Barcode Scanning", "Supplier Management"]
        }
    ];

    const pricingPlans = [
        {
            name: "Starter",
            price: "$29",
            period: "/month",
            description: "Perfect for small businesses getting started",
            features: ["Up to 100 products", "Basic online store", "Standard support", "Basic analytics"]
        },
        {
            name: "Professional",
            price: "$79",
            period: "/month",
            description: "Ideal for growing businesses",
            features: ["Unlimited products", "Advanced store features", "Priority support", "Advanced analytics"],
            popular: true
        },
        {
            name: "Enterprise",
            price: "$199",
            period: "/month",
            description: "For high-volume businesses",
            features: ["Custom solutions", "Dedicated account manager", "24/7 support", "Custom integrations"]
        }
    ];

    const successMetrics = [
        { number: "50K+", label: "Stores Powered" },
        { number: "$10B+", label: "Annual GMV" },
        { number: "150+", label: "Countries Served" },
        { number: "99.9%", label: "Uptime" }
    ];

    return (
        <>
        <Header/>
        <Navbar/>
        <div className="commerce-page">
            <div className="commerce-hero">
                <div className="container">
                    <h1 className="commerce-title">Commerce Platform</h1>
                    <p className="commerce-subtitle">Everything you need to build, manage, and grow your online business</p>
                    <button className="cta-button">Start Free Trial</button>
                </div>
            </div>

            <div className="commerce-content">
                <div className="container">
                    <div className="intro-section">
                        <h2>Power Your Online Business</h2>
                        <p>
                            From startup to enterprise, our commerce platform provides the tools and 
                            infrastructure to sell anywhere, scale fast, and deliver exceptional customer experiences.
                        </p>
                    </div>

                    <div className="metrics-section">
                        <div className="metrics-grid">
                            {successMetrics.map((metric, index) => (
                                <div key={index} className="metric-item">
                                    <div className="metric-number">{metric.number}</div>
                                    <div className="metric-label">{metric.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="features-section">
                        <h2>Complete Commerce Solution</h2>
                        <div className="features-grid">
                            {commerceFeatures.map((feature, index) => (
                                <div key={index} className="feature-card">
                                    <div className="feature-icon">{feature.icon}</div>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                    <ul className="feature-list">
                                        {feature.features.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                    <button className="learn-more-btn">Learn More</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pricing-section">
                        <h2>Choose Your Plan</h2>
                        <div className="pricing-grid">
                            {pricingPlans.map((plan, index) => (
                                <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                                    {plan.popular && <div className="popular-badge">Most Popular</div>}
                                    <div className="plan-header">
                                        <h3>{plan.name}</h3>
                                        <div className="plan-price">
                                            <span className="price">{plan.price}</span>
                                            <span className="period">{plan.period}</span>
                                        </div>
                                        <p className="plan-description">{plan.description}</p>
                                    </div>
                                    <ul className="plan-features">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                    <button className={`plan-button ${plan.popular ? 'primary' : 'secondary'}`}>
                                        Get Started
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="integration-section">
                        <div className="integration-content">
                            <h2>Seamless Ecosystem</h2>
                            <p>
                                Connect with hundreds of apps and services to extend your store's functionality. 
                                From marketing automation to accounting, we've got you covered.
                            </p>
                            <div className="integration-partners">
                                <span className="partner">Salesforce</span>
                                <span className="partner">Mailchimp</span>
                                <span className="partner">QuickBooks</span>
                                <span className="partner">Zapier</span>
                                <span className="partner">Google</span>
                                <span className="partner">Facebook</span>
                            </div>
                            <button className="view-integrations-btn">View All Integrations</button>
                        </div>
                    </div>

                    <div className="demo-section">
                        <div className="demo-content">
                            <h2>See Our Platform in Action</h2>
                            <p>
                                Take a guided tour of our commerce platform and discover how it can transform your business.
                            </p>
                            <div className="demo-buttons">
                                <button className="primary-demo-btn">Watch Demo</button>
                                <button className="secondary-demo-btn">Start Free Trial</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default Commerce;