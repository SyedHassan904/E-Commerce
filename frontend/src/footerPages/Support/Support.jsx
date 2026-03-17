import React, { useState, useEffect } from 'react';
import './support.css';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const Support = () => {
    const [activeCategory, setActiveCategory] = useState('general');
    const [openQuestion, setOpenQuestion] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);
    const [emailFormData, setEmailFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredQuestions, setFilteredQuestions] = useState([]);

    // Your contact information
    const contactInfo = {
        email: 'myselfhamzanasir@gmail.com',
        phone: '+92 306 266 8181',
        web3formsKey: 'b29ff959-e8d4-431f-b828-a8a67e6b6f38'
    };

    const supportCategories = [
        {
            id: 'general',
            name: 'General Help',
            icon: '❓',
            questions: [
                {
                    id: 'general-1',
                    question: "How do I create an account?",
                    answer: "Click the 'Sign Up' button in the top right corner, enter your email address, and follow the verification steps.",
                    tags: ['account', 'signup', 'registration']
                },
                {
                    id: 'general-2',
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and bank transfers.",
                    tags: ['payment', 'billing', 'checkout']
                },
                {
                    id: 'general-3',
                    question: "How can I reset my password?",
                    answer: "Click 'Forgot Password' on the login page and follow the instructions sent to your email.",
                    tags: ['password', 'security', 'login']
                }
            ]
        },
        {
            id: 'billing',
            name: 'Billing & Payments',
            icon: '💳',
            questions: [
                {
                    id: 'billing-1',
                    question: "When will I be charged?",
                    answer: "You're charged immediately for one-time purchases and on the same date each month for subscriptions.",
                    tags: ['billing', 'charges', 'subscription']
                },
                {
                    id: 'billing-2',
                    question: "Can I change my payment method?",
                    answer: "Yes, go to your account settings and update your payment information in the billing section.",
                    tags: ['payment', 'update', 'billing']
                },
                {
                    id: 'billing-3',
                    question: "How do I get a refund?",
                    answer: "Contact our support team within 30 days of purchase with your order number for refund requests.",
                    tags: ['refund', 'money', 'cancel']
                }
            ]
        },
        {
            id: 'technical',
            name: 'Technical Issues',
            icon: '🔧',
            questions: [
                {
                    id: 'technical-1',
                    question: "The website isn't loading properly",
                    answer: "Try clearing your browser cache and cookies, or use a different browser. If issues persist, contact support.",
                    tags: ['technical', 'browser', 'loading']
                },
                {
                    id: 'technical-2',
                    question: "I can't upload product images",
                    answer: "Ensure images are in JPG, PNG, or WebP format and under 10MB in size. Try compressing large images.",
                    tags: ['upload', 'images', 'media']
                },
                {
                    id: 'technical-3',
                    question: "Mobile app not working",
                    answer: "Update to the latest version from the app store. If problems continue, uninstall and reinstall the app.",
                    tags: ['mobile', 'app', 'technical']
                }
            ]
        },
        {
            id: 'account',
            name: 'Account Management',
            icon: '👤',
            questions: [
                {
                    id: 'account-1',
                    question: "How do I update my profile information?",
                    answer: "Go to 'Account Settings' from your dashboard to update your personal and business information.",
                    tags: ['profile', 'update', 'settings']
                },
                {
                    id: 'account-2',
                    question: "Can I have multiple stores under one account?",
                    answer: "Yes, you can manage multiple stores from a single account with our multi-store feature.",
                    tags: ['multiple', 'stores', 'management']
                },
                {
                    id: 'account-3',
                    question: "How do I delete my account?",
                    answer: "Contact customer support, and we'll guide you through the account deletion process.",
                    tags: ['delete', 'account', 'remove']
                }
            ]
        }
    ];

    const contactMethods = [
        {
            icon: '📧',
            title: 'Email Support',
            description: 'Get detailed responses via email',
            response: 'Within 24 hours',
            action: 'Send Email',
            onClick: () => setIsEmailFormOpen(true)
        },
        {
            icon: '💬',
            title: 'Live Chat',
            description: 'Instant help from our team',
            response: 'Immediate',
            action: 'Start Chat',
            onClick: () => setIsChatOpen(true)
        },
        {
            icon: '📞',
            title: 'Phone Support',
            description: 'Talk directly with experts',
            response: 'Within 5 minutes',
            action: 'Call Now',
            onClick: () => {
                window.location.href = `tel:${contactInfo.phone}`;
            }
        },
        {
            icon: '🔍',
            title: 'Community Forum',
            description: 'Get answers from other users',
            response: 'Variable',
            action: 'Visit Forum',
            onClick: () => window.open('https://community.example.com', '_blank')
        }
    ];

    // Search functionality
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredQuestions([]);
            return;
        }

        const allQuestions = supportCategories.flatMap(category => 
            category.questions.map(q => ({ ...q, category: category.name }))
        );

        const filtered = allQuestions.filter(item =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        setFilteredQuestions(filtered);
    }, [searchQuery]);

    const toggleQuestion = (questionId) => {
        if (openQuestion === questionId) {
            setOpenQuestion(null);
        } else {
            setOpenQuestion(questionId);
        }
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const userMessage = {
                id: Date.now(),
                text: newMessage,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString()
            };

            setChatMessages(prev => [...prev, userMessage]);
            setNewMessage('');

            // Simulate bot response after 1 second
            setTimeout(() => {
                const botMessage = {
                    id: Date.now() + 1,
                    text: "Thank you for your message. Our support team will respond shortly. How can we assist you today?",
                    sender: 'bot',
                    timestamp: new Date().toLocaleTimeString()
                };
                setChatMessages(prev => [...prev, botMessage]);
            }, 1000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleEmailFormChange = (e) => {
        const { name, value } = e.target;
        setEmailFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: contactInfo.web3formsKey,
                    subject: `Support Request: ${emailFormData.subject}`,
                    name: emailFormData.name,
                    email: emailFormData.email,
                    message: `
New Support Request:

Name: ${emailFormData.name}
Email: ${emailFormData.email}
Subject: ${emailFormData.subject}

Message:
${emailFormData.message}

Sent via Support Portal
                    `.trim(),
                    reply_to: emailFormData.email,
                    from_name: 'Support Portal'
                })
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success');
                setEmailFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                setTimeout(() => {
                    setSubmitStatus('');
                }, 3000);
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Search is handled by useEffect
    };

    return (
        <>
            <Header />
            <Navbar />
            <div className="support-page">
                <div className="support-hero">
                    <div className="container">
                        <h1 className="support-title">Help & Support</h1>
                        <p className="support-subtitle">Find answers and get help quickly</p>
                        <form onSubmit={handleSearch} className="search-bar">
                            <input
                                type="text"
                                placeholder="Search for help articles, guides, and more..."
                                className="search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="search-button">Search</button>
                        </form>
                        
                        {/* Search Results */}
                        {searchQuery && (
                            <div className="search-results">
                                <div className="search-results-content">
                                    <h4>Search Results for "{searchQuery}"</h4>
                                    {filteredQuestions.length > 0 ? (
                                        <div className="results-list">
                                            {filteredQuestions.map((item, index) => (
                                                <div 
                                                    key={index} 
                                                    className="search-result-item"
                                                    onClick={() => {
                                                        const category = supportCategories.find(cat => 
                                                            cat.questions.some(q => q.id === item.id)
                                                        );
                                                        if (category) {
                                                            setActiveCategory(category.id);
                                                            setOpenQuestion(item.id);
                                                            setSearchQuery('');
                                                        }
                                                    }}
                                                >
                                                    <div className="result-category">{item.category}</div>
                                                    <h5>{item.question}</h5>
                                                    <p>{item.answer.substring(0, 100)}...</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="no-results">
                                            <p>No results found for "{searchQuery}"</p>
                                            <button 
                                                className="contact-from-search"
                                                onClick={() => setIsEmailFormOpen(true)}
                                            >
                                                Contact Support
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="support-content">
                    <div className="container">
                        {/* Contact Methods Section */}
                        <div className="contact-section">
                            <div className="section-header">
                                <h2>Get Help Quickly</h2>
                                <p>Choose the best way to contact our support team</p>
                            </div>
                            
                            <div className="methods-grid">
                                {contactMethods.map((method, index) => (
                                    <div key={index} className="method-card">
                                        <div className="method-icon">{method.icon}</div>
                                        <h3>{method.title}</h3>
                                        <p>{method.description}</p>
                                        <div className="response-time">
                                            <span className="response-label">Response Time:</span>
                                            <span className="response-value">{method.response}</span>
                                        </div>
                                        <button 
                                            className="method-action-btn"
                                            onClick={method.onClick}
                                        >
                                            {method.action}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Email Form - Integrated below contact methods */}
                            <div className={`email-form-section ${isEmailFormOpen ? 'active' : ''}`}>
                                <div className="email-form-container">
                                    <div className="form-header">
                                        <h3>Send us a Message</h3>
                                        <p>We'll get back to you within 24 hours</p>
                                    </div>
                                    <form onSubmit={handleEmailSubmit} className="email-form">
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="name">Your Name *</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={emailFormData.name}
                                                    onChange={handleEmailFormChange}
                                                    required
                                                    disabled={isSubmitting}
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Your Email *</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={emailFormData.email}
                                                    onChange={handleEmailFormChange}
                                                    required
                                                    disabled={isSubmitting}
                                                    placeholder="Enter your email address"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="subject">Subject *</label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={emailFormData.subject}
                                                onChange={handleEmailFormChange}
                                                required
                                                disabled={isSubmitting}
                                                placeholder="What is this regarding?"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message">Your Message *</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={emailFormData.message}
                                                onChange={handleEmailFormChange}
                                                required
                                                disabled={isSubmitting}
                                                rows="5"
                                                placeholder="Please describe your issue or question in detail..."
                                            />
                                        </div>
                                        
                                        <div className="form-actions">
                                            <button
                                                type="button"
                                                className="cancel-btn"
                                                onClick={() => setIsEmailFormOpen(false)}
                                                disabled={isSubmitting}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="submit-btn"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="spinner"></div>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    'Send Message'
                                                )}
                                            </button>
                                        </div>
                                        
                                        {submitStatus === 'success' && (
                                            <div className="status-message success">
                                                ✅ Message sent successfully! We'll get back to you within 24 hours.
                                            </div>
                                        )}
                                        {submitStatus === 'error' && (
                                            <div className="status-message error">
                                                ❌ Failed to send message. Please try again or contact us directly at {contactInfo.email}
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="faq-section">
                            <div className="section-header">
                                <h2>Frequently Asked Questions</h2>
                                <p>Quick answers to common questions</p>
                            </div>
                            
                            <div className="faq-categories">
                                {supportCategories.map(category => (
                                    <button
                                        key={category.id}
                                        className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(category.id)}
                                    >
                                        <span className="tab-icon">{category.icon}</span>
                                        {category.name}
                                    </button>
                                ))}
                            </div>

                            <div className="faq-content">
                                {supportCategories
                                    .filter(category => category.id === activeCategory)
                                    .map(category => (
                                        <div key={category.id} className="questions-list">
                                            {category.questions.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={`faq-item ${openQuestion === item.id ? 'active' : ''}`}
                                                >
                                                    <div
                                                        className="faq-question"
                                                        onClick={() => toggleQuestion(item.id)}
                                                    >
                                                        <h3>{item.question}</h3>
                                                        <span className="expand-icon">
                                                            {openQuestion === item.id ? '−' : '+'}
                                                        </span>
                                                    </div>
                                                    <div className="faq-answer">
                                                        <p>{item.answer}</p>
                                                        <div className="question-tags">
                                                            {item.tags.map((tag, index) => (
                                                                <span key={index} className="tag">{tag}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        {/* Resources Section */}
                        <div className="resources-section">
                            <div className="section-header">
                                <h2>Helpful Resources</h2>
                                <p>Explore our documentation and guides</p>
                            </div>
                            <div className="resources-grid">
                                <div className="resource-card">
                                    <div className="resource-icon">📚</div>
                                    <h3>Knowledge Base</h3>
                                    <p>Comprehensive guides and tutorials for all features</p>
                                    <button className="resource-btn">Browse Articles</button>
                                </div>
                                <div className="resource-card">
                                    <div className="resource-icon">🎥</div>
                                    <h3>Video Tutorials</h3>
                                    <p>Step-by-step video guides for visual learners</p>
                                    <button className="resource-btn">Watch Videos</button>
                                </div>
                                <div className="resource-card">
                                    <div className="resource-icon">📖</div>
                                    <h3>User Guides</h3>
                                    <p>Detailed documentation for advanced features</p>
                                    <button className="resource-btn">Read Guides</button>
                                </div>
                                <div className="resource-card">
                                    <div className="resource-icon">🆕</div>
                                    <h3>What's New</h3>
                                    <p>Latest features, updates, and announcements</p>
                                    <button className="resource-btn">See Updates</button>
                                </div>
                            </div>
                        </div>

                        {/* Support CTA */}
                        <div className="support-cta">
                            <div className="cta-content">
                                <h2>Still Need Help?</h2>
                                <p>Our support team is available 24/7 to assist you with any questions or issues.</p>
                                <div className="cta-buttons">
                                    <button 
                                        className="contact-support-btn primary"
                                        onClick={() => setIsEmailFormOpen(true)}
                                    >
                                        Contact Support Team
                                    </button>
                                    <button 
                                        className="contact-support-btn secondary"
                                        onClick={() => window.location.href = `tel:${contactInfo.phone}`}
                                    >
                                        Call Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Live Chat Widget */}
            {isChatOpen && (
                <div className="chat-widget">
                    <div className="chat-header">
                        <h3>Live Chat Support</h3>
                        <button 
                            className="chat-close-btn"
                            onClick={() => setIsChatOpen(false)}
                        >
                            ×
                        </button>
                    </div>
                    <div className="chat-messages">
                        <div className="welcome-message">
                            <div className="message bot-message">
                                <div className="message-content">
                                    <p>👋 Hello! How can we help you today? Our average response time is under 5 minutes.</p>
                                    <span className="message-time">Just now</span>
                                </div>
                            </div>
                        </div>
                        {chatMessages.map(message => (
                            <div 
                                key={message.id} 
                                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                            >
                                <div className="message-content">
                                    <p>{message.text}</p>
                                    <span className="message-time">{message.timestamp}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="chat-input-container">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="chat-input"
                        />
                        <button 
                            onClick={handleSendMessage}
                            className="chat-send-btn"
                            disabled={!newMessage.trim()}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

            {/* Chat Toggle Button */}
            {!isChatOpen && (
                <button 
                    className="chat-toggle-btn"
                    onClick={() => setIsChatOpen(true)}
                >
                    💬 Live Chat
                </button>
            )}

            <Footer />
        </>
    );
};

export default Support;