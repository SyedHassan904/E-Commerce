import React from 'react';
import './partners.css';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const Partners = () => {
    const partnerCategories = [
        {
            title: "Technology Partners",
            description: "Leading technology companies that power our platform",
            partners: [
                { name: "AWS", logo: "☁️", description: "Cloud Infrastructure" },
                { name: "Stripe", logo: "💳", description: "Payment Processing" },
                { name: "Twilio", logo: "📞", description: "Communication APIs" },
                { name: "Segment", logo: "📊", description: "Customer Data Platform" }
            ]
        },
        {
            title: "Logistics Partners",
            description: "Global logistics providers ensuring fast and reliable delivery",
            partners: [
                { name: "FedEx", logo: "🚚", description: "Express Shipping" },
                { name: "UPS", logo: "📦", description: "Global Logistics" },
                { name: "DHL", logo: "✈️", description: "International Shipping" },
                { name: "USPS", logo: "📮", description: "Local Delivery" }
            ]
        },
        {
            title: "Brand Partners",
            description: "Trusted brands available on our platform",
            partners: [
                { name: "Nike", logo: "👟", description: "Athletic Wear" },
                { name: "Apple", logo: "📱", description: "Electronics" },
                { name: "Samsung", logo: "📺", description: "Home Appliances" },
                { name: "Adidas", logo: "👕", description: "Sportswear" }
            ]
        }
    ];

    const partnershipBenefits = [
        {
            icon: "🚀",
            title: "Increased Reach",
            description: "Access to millions of potential customers worldwide"
        },
        {
            icon: "💡",
            title: "Technical Integration",
            description: "Seamless API integration and technical support"
        },
        {
            icon: "📈",
            title: "Growth Opportunities",
            description: "Co-marketing and joint business development"
        },
        {
            icon: "🛡️",
            title: "Trust & Security",
            description: "Enterprise-grade security and compliance"
        }
    ];

    return (
        <>
            <Header />
            <Navbar />
            <div className="partners-page">
                <div className="partners-hero">
                    <div className="container">
                        <h1 className="partners-title">Partnerships</h1>
                        <p className="partners-subtitle">Building stronger together with our global partners</p>
                    </div>
                </div>

                <div className="partners-content">
                    <div className="container">
                        <div className="partnership-intro">
                            <h2>Why Partner With Us?</h2>
                            <p>
                                We believe in the power of collaboration. Our partnerships drive innovation,
                                expand reach, and create exceptional value for our customers and partners alike.
                            </p>
                        </div>

                        <div className="benefits-section">
                            <h2>Partnership Benefits</h2>
                            <div className="benefits-grid">
                                {partnershipBenefits.map((benefit, index) => (
                                    <div key={index} className="benefit-card">
                                        <div className="benefit-icon">{benefit.icon}</div>
                                        <h3>{benefit.title}</h3>
                                        <p>{benefit.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="partner-categories">
                            {partnerCategories.map((category, index) => (
                                <div key={index} className="category-section">
                                    <div className="category-header">
                                        <h3>{category.title}</h3>
                                        <p>{category.description}</p>
                                    </div>
                                    <div className="partners-grid">
                                        {category.partners.map((partner, partnerIndex) => (
                                            <div key={partnerIndex} className="partner-card">
                                                <div className="partner-logo">{partner.logo}</div>
                                                <h4>{partner.name}</h4>
                                                <p>{partner.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="become-partner">
                            <div className="partner-cta">
                                <h2>Become a Partner</h2>
                                <p>
                                    Interested in partnering with us? We're always looking for innovative
                                    companies to collaborate with and create amazing experiences for our customers.
                                </p>
                                <div className="cta-buttons">
                                    <button className="primary-btn">Become a Partner</button>
                                    <button className="secondary-btn">Contact Sales</button>
                                </div>
                            </div>
                        </div>

                        <div className="success-stories">
                            <h2>Success Stories</h2>
                            <div className="stories-grid">
                                <div className="story-card">
                                    <div className="story-content">
                                        <h3>200% Growth</h3>
                                        <p>
                                            "Partnering with this platform helped us achieve 200% growth in
                                            online sales within the first year of collaboration."
                                        </p>
                                        <div className="story-author">
                                            <strong>— Tech Startup CEO</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="story-card">
                                    <div className="story-content">
                                        <h3>Global Expansion</h3>
                                        <p>
                                            "The partnership enabled us to expand into 15 new international
                                            markets with minimal operational overhead."
                                        </p>
                                        <div className="story-author">
                                            <strong>— Fashion Brand Director</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="story-card">
                                    <div className="story-content">
                                        <h3>Seamless Integration</h3>
                                        <p>
                                            "Technical integration was smooth and well-supported, allowing
                                            us to focus on our core business while leveraging their platform."
                                        </p>
                                        <div className="story-author">
                                            <strong>— SaaS Company CTO</strong>
                                        </div>
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

export default Partners;