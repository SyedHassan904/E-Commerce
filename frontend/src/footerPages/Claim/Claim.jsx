import React, { useState } from 'react';
import './claim.css';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const Claim = () => {
    const [activeTab, setActiveTab] = useState('intellectual-property');

    const claimTypes = [
        {
            id: 'intellectual-property',
            title: 'Intellectual Property Claims',
            description: 'Report copyright, trademark, or other IP infringement',
            icon: '📝'
        },
        {
            id: 'content-removal',
            title: 'Content Removal Requests',
            description: 'Request removal of inappropriate or unauthorized content',
            icon: '🚫'
        },
        {
            id: 'defamation',
            title: 'Defamation Claims',
            description: 'Report false or defamatory statements',
            icon: '⚖️'
        },
        {
            id: 'counterfeit',
            title: 'Counterfeit Reports',
            description: 'Report counterfeit or fake products',
            icon: '🛡️'
        }
    ];

    const claimProcess = [
        {
            step: 1,
            title: 'Submit Claim',
            description: 'Fill out the claim form with detailed information',
            duration: '5-10 minutes'
        },
        {
            step: 2,
            title: 'Review Process',
            description: 'Our legal team reviews your claim within 24-48 hours',
            duration: '1-2 business days'
        },
        {
            step: 3,
            title: 'Investigation',
            description: 'We investigate the claim and gather relevant information',
            duration: '3-5 business days'
        },
        {
            step: 4,
            title: 'Resolution',
            description: 'We take appropriate action and notify all parties',
            duration: '1-2 business days'
        }
    ];

    const [formData, setFormData] = useState({
        claimType: '',
        fullName: '',
        email: '',
        phone: '',
        company: '',
        description: '',
        urls: '',
        evidence: '',
        agreement: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Claim submitted:', formData);
        alert('Your claim has been submitted successfully. We will review it within 24-48 hours.');
    };

    return (
        <>
        <Header/>
        <Navbar/>
        <div className="claim-page">
            <div className="claim-hero">
                <div className="container">
                    <h1 className="claim-title">File a Claim</h1>
                    <p className="claim-subtitle">Protect your rights and report violations</p>
                </div>
            </div>

            <div className="claim-content">
                <div className="container">
                    <div className="claim-types">
                        <h2>Types of Claims</h2>
                        <div className="types-grid">
                            {claimTypes.map(type => (
                                <div 
                                    key={type.id}
                                    className={`type-card ${activeTab === type.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(type.id)}
                                >
                                    <div className="type-icon">{type.icon}</div>
                                    <h3>{type.title}</h3>
                                    <p>{type.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="process-section">
                        <h2>Claim Process</h2>
                        <div className="process-steps">
                            {claimProcess.map(step => (
                                <div key={step.step} className="process-step">
                                    <div className="step-number">{step.step}</div>
                                    <div className="step-content">
                                        <h3>{step.title}</h3>
                                        <p>{step.description}</p>
                                        <span className="step-duration">{step.duration}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="claim-form-section">
                        <h2>Submit Your Claim</h2>
                        <form onSubmit={handleSubmit} className="claim-form">
                            <div className="form-group">
                                <label htmlFor="claimType">Type of Claim *</label>
                                <select 
                                    id="claimType"
                                    name="claimType"
                                    value={formData.claimType}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select claim type</option>
                                    {claimTypes.map(type => (
                                        <option key={type.id} value={type.id}>
                                            {type.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="fullName">Full Name *</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="company">Company/Organization</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Claim Description *</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="6"
                                    placeholder="Please provide a detailed description of your claim, including specific details about the alleged violation..."
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="urls">Relevant URLs</label>
                                <textarea
                                    id="urls"
                                    name="urls"
                                    value={formData.urls}
                                    onChange={handleInputChange}
                                    rows="3"
                                    placeholder="Please list any relevant URLs or links related to your claim (one per line)"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="evidence">Supporting Evidence</label>
                                <textarea
                                    id="evidence"
                                    name="evidence"
                                    value={formData.evidence}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder="Describe any supporting evidence you have (documents, screenshots, registration numbers, etc.)"
                                />
                            </div>

                            <div className="form-group checkbox-group">
                                <input
                                    type="checkbox"
                                    id="agreement"
                                    name="agreement"
                                    checked={formData.agreement}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="agreement">
                                    I certify that the information provided is accurate and complete to the best of my knowledge. *
                                </label>
                            </div>

                            <button type="submit" className="submit-claim-btn">
                                Submit Claim
                            </button>
                        </form>
                    </div>

                    <div className="legal-info">
                        <h3>Legal Information</h3>
                        <div className="legal-content">
                            <p>
                                <strong>Important:</strong> Filing a false claim may result in legal consequences. 
                                Please ensure all information provided is accurate and truthful.
                            </p>
                            <p>
                                For urgent matters or if you need immediate assistance, please contact our 
                                legal department directly at <a href="mailto:legal@company.com">legal@company.com</a> 
                                or call <a href="tel:+15551234567">+1 (555) 123-4567</a>.
                            </p>
                            <p>
                                All claims are handled in accordance with our <a href="/privacy">Privacy Policy</a> 
                                and <a href="/terms">Terms of Service</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default Claim;