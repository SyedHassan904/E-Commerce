import React, { useState } from 'react';
import './privacy.css';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const Privacy = () => {
    const [activeSection, setActiveSection] = useState('introduction');

    const privacySections = [
        {
            id: 'introduction',
            title: 'Introduction',
            content: `
                <p>Welcome to our Privacy Policy. Your privacy is critically important to us.</p>
                <p>This Privacy Policy document describes how we collect, use, and protect your personal information when you use our e-commerce platform and services.</p>
                <p>By using our services, you agree to the collection and use of information in accordance with this policy.</p>
            `
        },
        {
            id: 'information-collection',
            title: 'Information We Collect',
            content: `
                <h4>Personal Information</h4>
                <p>We collect information that you provide directly to us, including:</p>
                <ul>
                    <li>Name, email address, and contact information</li>
                    <li>Billing and shipping addresses</li>
                    <li>Payment information (processed securely through our payment partners)</li>
                    <li>Account credentials and preferences</li>
                </ul>
                
                <h4>Automatically Collected Information</h4>
                <p>When you use our services, we automatically collect:</p>
                <ul>
                    <li>Device information and IP address</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent on our platform</li>
                    <li>Purchase history and browsing behavior</li>
                </ul>
            `
        },
        {
            id: 'how-we-use',
            title: 'How We Use Your Information',
            content: `
                <p>We use the information we collect for various purposes, including:</p>
                <ul>
                    <li>Providing and maintaining our services</li>
                    <li>Processing transactions and delivering products</li>
                    <li>Personalizing your shopping experience</li>
                    <li>Communicating with you about orders, products, and promotions</li>
                    <li>Improving our platform and developing new features</li>
                    <li>Preventing fraud and ensuring security</li>
                    <li>Complying with legal obligations</li>
                </ul>
            `
        },
        {
            id: 'information-sharing',
            title: 'Information Sharing',
            content: `
                <p>We do not sell your personal information to third parties. We may share your information with:</p>
                <ul>
                    <li><strong>Service Providers:</strong> Trusted partners who assist in operating our platform (payment processors, shipping carriers)</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                    <li><strong>With Your Consent:</strong> When you explicitly agree to share your information</li>
                </ul>
            `
        },
        {
            id: 'data-security',
            title: 'Data Security',
            content: `
                <p>We implement appropriate security measures to protect your personal information:</p>
                <ul>
                    <li>Encryption of sensitive data during transmission</li>
                    <li>Secure storage with access controls</li>
                    <li>Regular security assessments and updates</li>
                    <li>Employee training on data protection</li>
                </ul>
                <p>While we strive to use commercially acceptable means to protect your information, no method of transmission over the Internet or electronic storage is 100% secure.</p>
            `
        },
        {
            id: 'your-rights',
            title: 'Your Rights',
            content: `
                <p>You have the right to:</p>
                <ul>
                    <li>Access and receive a copy of your personal data</li>
                    <li>Correct inaccurate or incomplete information</li>
                    <li>Request deletion of your personal data</li>
                    <li>Object to processing of your personal data</li>
                    <li>Data portability</li>
                    <li>Withdraw consent at any time</li>
                </ul>
                <p>To exercise these rights, please contact us using the information provided below.</p>
            `
        },
        {
            id: 'cookies',
            title: 'Cookies and Tracking',
            content: `
                <p>We use cookies and similar tracking technologies to:</p>
                <ul>
                    <li>Remember your preferences and settings</li>
                    <li>Analyze how our platform is used</li>
                    <li>Personalize content and advertisements</li>
                    <li>Provide social media features</li>
                </ul>
                <p>You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our platform.</p>
            `
        },
        {
            id: 'changes',
            title: 'Changes to This Policy',
            content: `
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
                <p>We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
            `
        },
        {
            id: 'contact',
            title: 'Contact Us',
            content: `
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <ul>
                    <li><strong>Email:</strong> privacy@company.com</li>
                    <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                    <li><strong>Address:</strong> 123 Commerce Street, Suite 100, San Francisco, CA 94105</li>
                </ul>
                <p><strong>Last Updated:</strong> March 1, 2024</p>
            `
        }
    ];

    return (
        <>
            <Header />
            <Navbar />
            <div className="privacy-page">
                <div className="privacy-hero">
                    <div className="container">
                        <h1 className="privacy-title">Privacy Policy</h1>
                        <p className="privacy-subtitle">How we protect and use your information</p>
                        <div className="last-updated">
                            Last Updated: March 1, 2024
                        </div>
                    </div>
                </div>

                <div className="privacy-content">
                    <div className="container">
                        <div className="privacy-layout">
                            <div className="sidebar">
                                <h3>Contents</h3>
                                <nav className="section-nav">
                                    {privacySections.map(section => (
                                        <button
                                            key={section.id}
                                            className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                                            onClick={() => setActiveSection(section.id)}
                                        >
                                            {section.title}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="content">
                                {privacySections
                                    .filter(section => section.id === activeSection)
                                    .map(section => (
                                        <div key={section.id} className="section-content">
                                            <h2>{section.title}</h2>
                                            <div
                                                className="content-text"
                                                dangerouslySetInnerHTML={{ __html: section.content }}
                                            />
                                        </div>
                                    ))
                                }

                                <div className="quick-actions">
                                    <h3>Quick Actions</h3>
                                    <div className="action-buttons">
                                        <button className="action-btn">Download PDF Version</button>
                                        <button className="action-btn">Request Data Access</button>
                                        <button className="action-btn">Contact Privacy Team</button>
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

export default Privacy;