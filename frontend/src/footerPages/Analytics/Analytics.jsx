import React from 'react';
import './analytics.css';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const Analytics = () => {
    const analyticsFeatures = [
        {
            icon: "📊",
            title: "Real-time Dashboard",
            description: "Monitor key metrics and performance indicators in real-time with customizable dashboards.",
            metrics: ["Live Traffic", "Conversion Rates", "Revenue Tracking", "User Behavior"]
        },
        {
            icon: "🎯",
            title: "Customer Insights",
            description: "Understand your customers with detailed demographic and behavioral analytics.",
            metrics: ["Customer Segmentation", "Purchase Patterns", "Lifetime Value", "Retention Rates"]
        },
        {
            icon: "🛒",
            title: "E-commerce Analytics",
            description: "Track sales performance, product trends, and shopping cart behavior.",
            metrics: ["Sales Funnel", "Product Performance", "Cart Abandonment", "Inventory Insights"]
        },
        {
            icon: "📈",
            title: "Marketing Analytics",
            description: "Measure campaign effectiveness and optimize your marketing spend.",
            metrics: ["ROI Analysis", "Channel Performance", "Attribution Modeling", "Customer Acquisition Cost"]
        }
    ];

    const dataPoints = [
        { label: "Monthly Visitors", value: "2.5M", change: "+15%" },
        { label: "Conversion Rate", value: "3.8%", change: "+2%" },
        { label: "Average Order Value", value: "$89.50", change: "+5%" },
        { label: "Customer Retention", value: "68%", change: "+8%" }
    ];

    const reports = [
        {
            title: "Sales Performance Report",
            description: "Comprehensive analysis of sales trends and revenue performance.",
            frequency: "Daily"
        },
        {
            title: "Customer Behavior Analysis",
            description: "Insights into customer journey and purchasing patterns.",
            frequency: "Weekly"
        },
        {
            title: "Marketing ROI Report",
            description: "Detailed breakdown of marketing campaign performance and ROI.",
            frequency: "Monthly"
        },
        {
            title: "Inventory & Sales Forecast",
            description: "Predictive analytics for inventory management and sales forecasting.",
            frequency: "Quarterly"
        }
    ];

    return (
        <>
            <Header />
            <Navbar />
            <div className="analytics-page">
                <div className="analytics-hero">
                    <div className="container">
                        <h1 className="analytics-title">Advanced Analytics</h1>
                        <p className="analytics-subtitle">Transform data into actionable insights</p>
                        <button className="cta-button">View Demo Dashboard</button>
                    </div>
                </div>

                <div className="analytics-content">
                    <div className="container">
                        <div className="intro-section">
                            <h2>Data-Driven Decision Making</h2>
                            <p>
                                Unlock the power of your data with our comprehensive analytics platform.
                                Make informed decisions that drive growth and optimize performance.
                            </p>
                        </div>

                        <div className="metrics-overview">
                            <h2>Key Performance Indicators</h2>
                            <div className="metrics-grid">
                                {dataPoints.map((metric, index) => (
                                    <div key={index} className="metric-card">
                                        <div className="metric-value">{metric.value}</div>
                                        <div className="metric-label">{metric.label}</div>
                                        <div className="metric-change positive">{metric.change}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="features-section">
                            <h2>Analytics Features</h2>
                            <div className="features-grid">
                                {analyticsFeatures.map((feature, index) => (
                                    <div key={index} className="feature-card">
                                        <div className="feature-icon">{feature.icon}</div>
                                        <h3>{feature.title}</h3>
                                        <p>{feature.description}</p>
                                        <div className="metrics-list">
                                            {feature.metrics.map((metric, idx) => (
                                                <span key={idx} className="metric-tag">{metric}</span>
                                            ))}
                                        </div>
                                        <button className="explore-btn">Explore Feature</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="reports-section">
                            <h2>Automated Reporting</h2>
                            <div className="reports-grid">
                                {reports.map((report, index) => (
                                    <div key={index} className="report-card">
                                        <div className="report-header">
                                            <h3>{report.title}</h3>
                                            <span className="report-frequency">{report.frequency}</span>
                                        </div>
                                        <p>{report.description}</p>
                                        <div className="report-actions">
                                            <button className="view-sample-btn">View Sample</button>
                                            <button className="schedule-btn">Schedule Report</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="integration-section">
                            <div className="integration-content">
                                <h2>Seamless Integrations</h2>
                                <p>
                                    Connect with your favorite tools and platforms. Our analytics platform
                                    integrates with over 50+ services including Google Analytics, Shopify,
                                    Salesforce, and more.
                                </p>
                                <div className="integration-logos">
                                    <span className="integration-logo">Google Analytics</span>
                                    <span className="integration-logo">Shopify</span>
                                    <span className="integration-logo">Salesforce</span>
                                    <span className="integration-logo">Facebook</span>
                                    <span className="integration-logo">Mailchimp</span>
                                    <span className="integration-logo">+45 more</span>
                                </div>
                                <button className="integrations-btn">View All Integrations</button>
                            </div>
                        </div>

                        <div className="demo-section">
                            <div className="demo-content">
                                <h2>See Analytics in Action</h2>
                                <p>
                                    Experience the power of our analytics platform with a personalized demo.
                                    See how you can transform your data into growth opportunities.
                                </p>
                                <div className="demo-buttons">
                                    <button className="primary-demo-btn">Request Demo</button>
                                    <button className="secondary-demo-btn">Start Free Trial</button>
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

export default Analytics;