import React from 'react';
import './marketing.css';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const Marketing = () => {
    const marketingServices = [
        {
            icon: "🎯",
            title: "Digital Advertising",
            description: "Targeted campaigns across search, social, and display networks to reach your ideal customers.",
            features: ["PPC Management", "Social Media Ads", "Retargeting", "Conversion Optimization"]
        },
        {
            icon: "📈",
            title: "SEO & Content Strategy",
            description: "Improve your search visibility and engage customers with strategic content marketing.",
            features: ["Keyword Research", "Content Creation", "Technical SEO", "Link Building"]
        },
        {
            icon: "📧",
            title: "Email Marketing",
            description: "Build relationships and drive sales with personalized email campaigns and automation.",
            features: ["Newsletter Campaigns", "Automation Flows", "A/B Testing", "Analytics & Reporting"]
        },
        {
            icon: "📱",
            title: "Social Media Marketing",
            description: "Connect with your audience and build brand loyalty across social platforms.",
            features: ["Content Strategy", "Community Management", "Influencer Partnerships", "Performance Tracking"]
        }
    ];

    const caseStudies = [
        {
            company: "Fashion Retailer",
            result: "300% ROI Increase",
            description: "Implemented multi-channel strategy leading to significant revenue growth."
        },
        {
            company: "Tech Startup",
            result: "50% Cost Reduction",
            description: "Optimized ad spend while maintaining conversion rates."
        },
        {
            company: "E-commerce Brand",
            result: "2x Engagement",
            description: "Social media strategy doubled customer engagement metrics."
        }
    ];

    const marketingTools = [
        {
            name: "Campaign Manager",
            description: "Plan, execute, and track all your marketing campaigns in one place.",
            icon: "📊"
        },
        {
            name: "Audience Insights",
            description: "Deep analytics to understand your customers and their behavior.",
            icon: "👥"
        },
        {
            name: "Automation Studio",
            description: "Create automated marketing workflows that convert.",
            icon: "⚡"
        },
        {
            name: "Performance Dashboard",
            description: "Real-time metrics and customizable reporting.",
            icon: "📈"
        }
    ];

    return (
        <>
            <Header />
            <Navbar />
            <div className="marketing-page">
                <div className="marketing-hero">
                    <div className="container">
                        <h1 className="marketing-title">Marketing Solutions</h1>
                        <p className="marketing-subtitle">Drive growth with data-driven marketing strategies</p>
                        <button className="cta-button">Get Started</button>
                    </div>
                </div>

                <div className="marketing-content">
                    <div className="container">
                        <div className="intro-section">
                            <h2>Transform Your Marketing Strategy</h2>
                            <p>
                                Leverage our comprehensive marketing platform to reach new customers,
                                engage your audience, and drive measurable business growth.
                            </p>
                        </div>

                        <div className="services-section">
                            <h2>Our Marketing Services</h2>
                            <div className="services-grid">
                                {marketingServices.map((service, index) => (
                                    <div key={index} className="service-card">
                                        <div className="service-icon">{service.icon}</div>
                                        <h3>{service.title}</h3>
                                        <p>{service.description}</p>
                                        <ul className="service-features">
                                            {service.features.map((feature, idx) => (
                                                <li key={idx}>{feature}</li>
                                            ))}
                                        </ul>
                                        <button className="learn-more-btn">Learn More</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="results-section">
                            <h2>Proven Results</h2>
                            <div className="results-grid">
                                {caseStudies.map((study, index) => (
                                    <div key={index} className="result-card">
                                        <div className="result-badge">{study.result}</div>
                                        <h3>{study.company}</h3>
                                        <p>{study.description}</p>
                                        <button className="case-study-btn">View Case Study</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="tools-section">
                            <h2>Marketing Tools & Platform</h2>
                            <div className="tools-grid">
                                {marketingTools.map((tool, index) => (
                                    <div key={index} className="tool-card">
                                        <div className="tool-icon">{tool.icon}</div>
                                        <h3>{tool.name}</h3>
                                        <p>{tool.description}</p>
                                        <button className="tool-demo-btn">See Demo</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="cta-section">
                            <div className="cta-content">
                                <h2>Ready to Boost Your Marketing?</h2>
                                <p>Start your journey to better marketing performance today.</p>
                                <div className="cta-buttons">
                                    <button className="primary-cta">Schedule a Demo</button>
                                    <button className="secondary-cta">Contact Sales</button>
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

export default Marketing;