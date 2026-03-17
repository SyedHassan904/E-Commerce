import React from 'react';
import './press.css';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const Press = () => {
    const pressReleases = [
        {
            id: 1,
            title: "Company Reaches 10 Million Customer Milestone",
            date: "March 1, 2024",
            excerpt: "Our e-commerce platform celebrates serving 10 million customers worldwide, marking significant growth in the online retail space.",
            category: "Company News"
        },
        {
            id: 2,
            title: "New Sustainable Packaging Initiative Launched",
            date: "February 15, 2024",
            excerpt: "We introduce eco-friendly packaging solutions across all shipments, reducing plastic waste by 75%.",
            category: "Sustainability"
        },
        {
            id: 3,
            title: "Partnership with Major Tech Company Announced",
            date: "February 1, 2024",
            excerpt: "Strategic collaboration to enhance AI-powered shopping experiences and personalized recommendations.",
            category: "Partnerships"
        },
        {
            id: 4,
            title: "Record-Breaking Holiday Sales Season",
            date: "January 10, 2024",
            excerpt: "Platform achieves 200% year-over-year growth during the holiday shopping season.",
            category: "Business Results"
        }
    ];

    const mediaFeatures = [
        {
            outlet: "TechCrunch",
            title: "How This E-Commerce Platform is Revolutionizing Online Shopping",
            date: "March 5, 2024",
            link: "#"
        },
        {
            outlet: "Forbes",
            title: "The Rise of Customer-Centric E-Commerce: A Case Study",
            date: "February 28, 2024",
            link: "#"
        },
        {
            outlet: "Business Insider",
            title: "Inside the Tech Stack Powering Millions of Transactions",
            date: "February 20, 2024",
            link: "#"
        },
        {
            outlet: "The Verge",
            title: "Sustainable E-Commerce: How One Company is Making a Difference",
            date: "February 12, 2024",
            link: "#"
        }
    ];

    const pressKit = {
        logo: "Company Logo Pack",
        brandAssets: "Brand Guidelines & Assets",
        executivePhotos: "Executive Team Photos",
        productShots: "Product Screenshots",
        companyFactSheet: "Company Fact Sheet"
    };

    return (
        <>
            <Header />
            <Navbar />
            <div className="press-page">
                <div className="press-hero">
                    <div className="container">
                        <h1 className="press-title">Press & Media</h1>
                        <p className="press-subtitle">Latest news and media resources</p>
                    </div>
                </div>

                <div className="press-content">
                    <div className="container">
                        <div className="press-contact">
                            <h2>Media Contact</h2>
                            <div className="contact-info">
                                <div className="contact-item">
                                    <strong>Press Inquiries:</strong>
                                    <span>press@company.com</span>
                                </div>
                                <div className="contact-item">
                                    <strong>Phone:</strong>
                                    <span>+1 (555) 123-4567</span>
                                </div>
                            </div>
                        </div>

                        <div className="press-releases">
                            <h2>Press Releases</h2>
                            <div className="releases-grid">
                                {pressReleases.map(release => (
                                    <div key={release.id} className="release-card">
                                        <div className="release-header">
                                            <span className="release-category">{release.category}</span>
                                            <span className="release-date">{release.date}</span>
                                        </div>
                                        <h3 className="release-title">{release.title}</h3>
                                        <p className="release-excerpt">{release.excerpt}</p>
                                        <button className="read-more-btn">Read Full Release</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="media-features">
                            <h2>Media Coverage</h2>
                            <div className="features-list">
                                {mediaFeatures.map((feature, index) => (
                                    <div key={index} className="feature-item">
                                        <div className="feature-outlet">{feature.outlet}</div>
                                        <div className="feature-content">
                                            <h3>{feature.title}</h3>
                                            <span className="feature-date">{feature.date}</span>
                                        </div>
                                        <a href={feature.link} className="feature-link">Read Article</a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="press-kit">
                            <h2>Press Kit</h2>
                            <div className="kit-grid">
                                {Object.entries(pressKit).map(([key, value]) => (
                                    <div key={key} className="kit-item">
                                        <div className="kit-icon">📁</div>
                                        <h3>{value}</h3>
                                        <button className="download-btn">Download</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="executive-team">
                            <h2>Executive Team</h2>
                            <div className="team-grid">
                                <div className="executive-card">
                                    <div className="executive-avatar">👨‍💼</div>
                                    <h3>John Smith</h3>
                                    <p>Chief Executive Officer</p>
                                    <button className="bio-btn">View Bio</button>
                                </div>
                                <div className="executive-card">
                                    <div className="executive-avatar">👩‍💼</div>
                                    <h3>Sarah Johnson</h3>
                                    <p>Chief Technology Officer</p>
                                    <button className="bio-btn">View Bio</button>
                                </div>
                                <div className="executive-card">
                                    <div className="executive-avatar">👨‍💼</div>
                                    <h3>Michael Chen</h3>
                                    <p>Chief Operating Officer</p>
                                    <button className="bio-btn">View Bio</button>
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

export default Press;