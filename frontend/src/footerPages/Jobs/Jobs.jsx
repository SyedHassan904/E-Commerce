import React from 'react';
import './jobs.css';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const Jobs = () => {
    const jobOpenings = [
        {
            id: 1,
            title: "Frontend Developer",
            department: "Engineering",
            location: "Remote",
            type: "Full-time",
            experience: "Mid-level",
            description: "Join our frontend team to build amazing user experiences using React and modern web technologies."
        },
        {
            id: 2,
            title: "Product Manager",
            department: "Product",
            location: "San Francisco, CA",
            type: "Full-time",
            experience: "Senior",
            description: "Lead product strategy and work with cross-functional teams to deliver exceptional e-commerce solutions."
        },
        {
            id: 3,
            title: "UX/UI Designer",
            department: "Design",
            location: "Remote",
            type: "Full-time",
            experience: "Mid-level",
            description: "Create beautiful and intuitive designs that enhance our customers' shopping experience."
        },
        {
            id: 4,
            title: "Data Analyst",
            department: "Analytics",
            location: "New York, NY",
            type: "Full-time",
            experience: "Junior",
            description: "Analyze customer data to provide insights that drive business decisions and improve user experience."
        },
        {
            id: 5,
            title: "DevOps Engineer",
            department: "Engineering",
            location: "Remote",
            type: "Full-time",
            experience: "Senior",
            description: "Build and maintain our cloud infrastructure to ensure scalability and reliability."
        },
        {
            id: 6,
            title: "Customer Success Manager",
            department: "Support",
            location: "Austin, TX",
            type: "Full-time",
            experience: "Mid-level",
            description: "Help our customers succeed and build long-lasting relationships with our platform."
        }
    ];

    const benefits = [
        {
            icon: "💼",
            title: "Competitive Salary",
            description: "Industry-leading compensation packages"
        },
        {
            icon: "🏥",
            title: "Health Insurance",
            description: "Comprehensive medical, dental, and vision coverage"
        },
        {
            icon: "📈",
            title: "Stock Options",
            description: "Share in our success with equity packages"
        },
        {
            icon: "🏖️",
            title: "Unlimited PTO",
            description: "Take time off when you need it"
        },
        {
            icon: "🏠",
            title: "Remote Work",
            description: "Work from anywhere in the world"
        },
        {
            icon: "🎓",
            title: "Learning Budget",
            description: "Annual budget for professional development"
        }
    ];

    return (
        <>
            <Header />
            <Navbar />
            <div className="jobs-page">
                <div className="jobs-hero">
                    <div className="container">
                        <h1 className="jobs-title">Join Our Team</h1>
                        <p className="jobs-subtitle">Build the future of e-commerce with us</p>
                        <button className="cta-button">View Open Positions</button>
                    </div>
                </div>

                <div className="jobs-content">
                    <div className="container">
                        <div className="jobs-intro">
                            <h2>Why Work With Us?</h2>
                            <p>
                                We're building the next generation of e-commerce platforms. Join a team that values
                                innovation, collaboration, and making a real impact in the world of online shopping.
                            </p>
                        </div>

                        <div className="benefits-section">
                            <h2>Perks & Benefits</h2>
                            <div className="benefits-grid">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="benefit-card">
                                        <div className="benefit-icon">{benefit.icon}</div>
                                        <h3>{benefit.title}</h3>
                                        <p>{benefit.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="open-positions">
                            <h2>Open Positions</h2>
                            <div className="jobs-grid">
                                {jobOpenings.map(job => (
                                    <div key={job.id} className="job-card">
                                        <div className="job-header">
                                            <h3 className="job-title">{job.title}</h3>
                                            <span className="job-department">{job.department}</span>
                                        </div>
                                        <div className="job-details">
                                            <div className="job-meta">
                                                <span className="job-location">📍 {job.location}</span>
                                                <span className="job-type">⏱️ {job.type}</span>
                                                <span className="job-experience">🎯 {job.experience}</span>
                                            </div>
                                            <p className="job-description">{job.description}</p>
                                        </div>
                                        <div className="job-actions">
                                            <button className="apply-btn">Apply Now</button>
                                            <button className="learn-more-btn">Learn More</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="culture-section">
                            <div className="culture-content">
                                <h2>Our Culture</h2>
                                <p>
                                    We believe in transparency, ownership, and continuous learning. Our team is
                                    passionate about solving complex problems and delivering exceptional value
                                    to our customers.
                                </p>
                                <div className="culture-stats">
                                    <div className="culture-stat">
                                        <h3>50+</h3>
                                        <p>Team Members</p>
                                    </div>
                                    <div className="culture-stat">
                                        <h3>15+</h3>
                                        <p>Countries</p>
                                    </div>
                                    <div className="culture-stat">
                                        <h3>4.8/5</h3>
                                        <p>Employee Satisfaction</p>
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

export default Jobs;