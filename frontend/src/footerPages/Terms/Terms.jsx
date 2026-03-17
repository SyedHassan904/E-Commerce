import React, { useState } from 'react';
import './terms.css';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const Terms = () => {
    const [activeSection, setActiveSection] = useState('agreement');

    const termsSections = [
        {
            id: 'agreement',
            title: 'Agreement to Terms',
            content: `
                <p>These Terms of Service ("Terms") govern your access to and use of our e-commerce platform, website, and services (collectively, the "Services").</p>
                <p>By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you disagree with any part of the terms, you may not access the Services.</p>
                <p>These Terms apply to all visitors, users, and others who access or use the Services.</p>
            `
        },
        {
            id: 'accounts',
            title: 'Accounts',
            content: `
                <p>When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms.</p>
                <p>You are responsible for safeguarding the password that you use to access the Services and for any activities or actions under your password.</p>
                <p>You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
            `
        },
        {
            id: 'purchases',
            title: 'Purchases and Payments',
            content: `
                <h4>Product Information</h4>
                <p>We strive to display accurate product information, including descriptions, prices, and availability. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
                
                <h4>Pricing</h4>
                <p>All prices are subject to change without notice. We reserve the right to modify or discontinue any product or service without notice at any time.</p>
                
                <h4>Payment</h4>
                <p>You agree to provide current, complete, and accurate purchase and account information for all purchases made through our platform. You further agree to promptly update account and payment information.</p>
                
                <h4>Order Acceptance</h4>
                <p>We reserve the right to refuse or cancel any order for any reason, including limitations on quantities available, inaccuracies in product information, or problems identified by our credit and fraud avoidance department.</p>
            `
        },
        {
            id: 'prohibited',
            title: 'Prohibited Uses',
            content: `
                <p>You may use the Services only for lawful purposes and in accordance with these Terms. You agree not to use the Services:</p>
                <ul>
                    <li>In any way that violates any applicable law or regulation</li>
                    <li>To engage in any fraudulent or deceptive activities</li>
                    <li>To transmit any unsolicited or unauthorized advertising</li>
                    <li>To impersonate any person or entity</li>
                    <li>To interfere with or disrupt the integrity or performance of the Services</li>
                    <li>To attempt to gain unauthorized access to any portion of the Services</li>
                    <li>To upload or transmit viruses or any other malicious code</li>
                </ul>
            `
        },
        {
            id: 'intellectual-property',
            title: 'Intellectual Property',
            content: `
                <p>The Services and their original content, features, and functionality are and will remain the exclusive property of the Company and its licensors.</p>
                <p>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the Company.</p>
                <p>You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise use any content from our Services without express written permission.</p>
            `
        },
        {
            id: 'termination',
            title: 'Termination',
            content: `
                <p>We may terminate or suspend your account and bar access to the Services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of the Terms.</p>
                <p>If you wish to terminate your account, you may simply discontinue using the Services or contact us to request account deletion.</p>
                <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>
            `
        },
        {
            id: 'limitation',
            title: 'Limitation of Liability',
            content: `
                <p>In no event shall the Company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
                <ul>
                    <li>Your access to or use of or inability to access or use the Services</li>
                    <li>Any conduct or content of any third party on the Services</li>
                    <li>Any content obtained from the Services</li>
                    <li>Unauthorized access, use or alteration of your transmissions or content</li>
                </ul>
            `
        },
        {
            id: 'disclaimer',
            title: 'Disclaimer',
            content: `
                <p>Your use of the Services is at your sole risk. The Services are provided on an "AS IS" and "AS AVAILABLE" basis. The Services are provided without warranties of any kind, whether express or implied.</p>
                <p>The Company does not warrant that:</p>
                <ul>
                    <li>The Services will function uninterrupted, secure or available at any particular time or location</li>
                    <li>Any errors or defects will be corrected</li>
                    <li>The Services are free of viruses or other harmful components</li>
                    <li>The results of using the Services will meet your requirements</li>
                </ul>
            `
        },
        {
            id: 'governing-law',
            title: 'Governing Law',
            content: `
                <p>These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.</p>
                <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
            `
        },
        {
            id: 'changes',
            title: 'Changes to Terms',
            content: `
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.</p>
                <p>What constitutes a material change will be determined at our sole discretion.</p>
                <p>By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms.</p>
            `
        },
        {
            id: 'contact',
            title: 'Contact Information',
            content: `
                <p>If you have any questions about these Terms, please contact us:</p>
                <ul>
                    <li><strong>Email:</strong> legal@company.com</li>
                    <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                    <li><strong>Address:</strong>                    <li><strong>Address:</strong> 123 Commerce Street, Suite 100, San Francisco, CA 94105</li>
                </ul>
                <p><strong>Last Updated:</strong> March 1, 2024</p>
            `
        }
    ];

    return (
        <>
            <Header />
            <Navbar />
            <div className="terms-page">
                <div className="terms-hero">
                    <div className="container">
                        <h1 className="terms-title">Terms of Service</h1>
                        <p className="terms-subtitle">Please read these terms carefully before using our services</p>
                        <div className="last-updated">
                            Last Updated: March 1, 2024
                        </div>
                    </div>
                </div>

                <div className="terms-content">
                    <div className="container">
                        <div className="terms-layout">
                            <div className="sidebar">
                                <h3>Contents</h3>
                                <nav className="section-nav">
                                    {termsSections.map(section => (
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
                                {termsSections
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

                                <div className="acceptance-section">
                                    <div className="acceptance-card">
                                        <h3>Acceptance of Terms</h3>
                                        <p>
                                            By accessing or using our Services, you acknowledge that you have read,
                                            understood, and agree to be bound by these Terms of Service and our
                                            Privacy Policy.
                                        </p>
                                        <div className="acceptance-actions">
                                            <button className="accept-btn">I Accept</button>
                                            <button className="decline-btn">I Decline</button>
                                        </div>
                                        <p className="acceptance-note">
                                            You must accept these terms to continue using our services.
                                        </p>
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

export default Terms;