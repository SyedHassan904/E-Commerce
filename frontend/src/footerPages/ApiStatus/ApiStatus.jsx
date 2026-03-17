import React, { useState, useEffect } from 'react';
import './apiStatus.css';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const ApiStatus = () => {
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [incidents, setIncidents] = useState([]);

    const apiServices = [
        {
            name: 'Core API',
            description: 'Main e-commerce API endpoints',
            status: 'operational',
            responseTime: '45ms',
            uptime: '99.99%'
        },
        {
            name: 'Payment Gateway',
            description: 'Payment processing services',
            status: 'operational',
            responseTime: '120ms',
            uptime: '99.98%'
        },
        {
            name: 'Authentication',
            description: 'User authentication and authorization',
            status: 'operational',
            responseTime: '25ms',
            uptime: '99.99%'
        },
        {
            name: 'File Storage',
            description: 'Image and file upload services',
            status: 'degraded',
            responseTime: '280ms',
            uptime: '99.85%'
        },
        {
            name: 'Email Service',
            description: 'Transactional email delivery',
            status: 'operational',
            responseTime: '65ms',
            uptime: '99.97%'
        },
        {
            name: 'Analytics',
            description: 'Data analytics and reporting',
            status: 'operational',
            responseTime: '85ms',
            uptime: '99.96%'
        }
    ];

    const statusHistory = [
        { date: '2024-03-20', status: 'operational', duration: '24h' },
        { date: '2024-03-19', status: 'degraded', duration: '2h', description: 'Database maintenance' },
        { date: '2024-03-15', status: 'operational', duration: '24h' },
        { date: '2024-03-14', status: 'partial_outage', duration: '45m', description: 'CDN issues' },
        { date: '2024-03-10', status: 'operational', duration: '24h' }
    ];

    useEffect(() => {
        // Simulate fetching incidents
        const mockIncidents = [
            {
                id: 1,
                title: 'Increased Latency in File Uploads',
                status: 'monitoring',
                severity: 'minor',
                started: '2 hours ago',
                updates: [
                    { time: '1 hour ago', message: 'Identified the issue with CDN provider' },
                    { time: '30 minutes ago', message: 'Working on optimization' }
                ]
            },
            {
                id: 2,
                title: 'Scheduled Maintenance',
                status: 'scheduled',
                severity: 'maintenance',
                started: 'Starts in 3 hours',
                updates: [
                    { time: '2 hours ago', message: 'Maintenance window scheduled' }
                ]
            }
        ];
        setIncidents(mockIncidents);

        // Update last updated time every minute
        const interval = setInterval(() => {
            setLastUpdated(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'operational': return '#4caf50';
            case 'degraded': return '#ff9800';
            case 'partial_outage': return '#f44336';
            case 'major_outage': return '#d32f2f';
            case 'maintenance': return '#2196f3';
            case 'monitoring': return '#ffc107';
            default: return '#9e9e9e';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'operational': return 'Operational';
            case 'degraded': return 'Degraded Performance';
            case 'partial_outage': return 'Partial Outage';
            case 'major_outage': return 'Major Outage';
            case 'maintenance': return 'Under Maintenance';
            case 'monitoring': return 'Under Monitoring';
            default: return 'Unknown';
        }
    };

    return (
        <>
        <Header/>
        <Navbar/>
        <div className="api-status-page">
            <div className="status-hero">
                <div className="container">
                    <h1 className="status-title">API Status</h1>
                    <p className="status-subtitle">Real-time status of our API services and infrastructure</p>
                    <div className="status-overview">
                        <div className="overview-card operational">
                            <div className="status-indicator"></div>
                            <div className="overview-content">
                                <h3>All Systems Operational</h3>
                                <p>All services are running normally</p>
                            </div>
                        </div>
                        <div className="last-updated">
                            Last updated: {lastUpdated.toLocaleTimeString()}
                        </div>
                    </div>
                </div>
            </div>

            <div className="status-content">
                <div className="container">
                    <div className="services-section">
                        <h2>Service Status</h2>
                        <div className="services-grid">
                            {apiServices.map((service, index) => (
                                <div key={index} className="service-card">
                                    <div className="service-header">
                                        <h3>{service.name}</h3>
                                        <div 
                                            className="status-badge"
                                            style={{ backgroundColor: getStatusColor(service.status) }}
                                        >
                                            {getStatusText(service.status)}
                                        </div>
                                    </div>
                                    <p className="service-description">{service.description}</p>
                                    <div className="service-metrics">
                                        <div className="metric">
                                            <span className="metric-label">Response Time</span>
                                            <span className="metric-value">{service.responseTime}</span>
                                        </div>
                                        <div className="metric">
                                            <span className="metric-label">Uptime</span>
                                            <span className="metric-value">{service.uptime}</span>
                                        </div>
                                    </div>
                                    <button className="view-details-btn">View Details</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="incidents-section">
                        <h2>Recent Incidents</h2>
                        {incidents.length > 0 ? (
                            <div className="incidents-list">
                                {incidents.map(incident => (
                                    <div key={incident.id} className="incident-card">
                                        <div className="incident-header">
                                            <div className="incident-title">
                                                <h3>{incident.title}</h3>
                                                <div 
                                                    className="incident-status"
                                                    style={{ backgroundColor: getStatusColor(incident.status) }}
                                                >
                                                    {getStatusText(incident.status)}
                                                </div>
                                            </div>
                                            <div className="incident-meta">
                                                <span className="incident-severity">{incident.severity}</span>
                                                <span className="incident-time">{incident.started}</span>
                                            </div>
                                        </div>
                                        <div className="incident-updates">
                                            {incident.updates.map((update, idx) => (
                                                <div key={idx} className="update-item">
                                                    <span className="update-time">{update.time}</span>
                                                    <p className="update-message">{update.message}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-incidents">
                                <div className="no-incidents-icon">✅</div>
                                <h3>No Active Incidents</h3>
                                <p>All systems are operating normally</p>
                            </div>
                        )}
                    </div>

                    <div className="history-section">
                        <h2>Status History</h2>
                        <div className="history-timeline">
                            {statusHistory.map((event, index) => (
                                <div key={index} className="timeline-item">
                                    <div 
                                        className="timeline-status"
                                        style={{ backgroundColor: getStatusColor(event.status) }}
                                    ></div>
                                    <div className="timeline-content">
                                        <div className="timeline-date">{event.date}</div>
                                        <div className="timeline-info">
                                            <span className="timeline-status-text">
                                                {getStatusText(event.status)}
                                            </span>
                                            <span className="timeline-duration">{event.duration}</span>
                                        </div>
                                        {event.description && (
                                            <p className="timeline-description">{event.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="subscribe-section">
                        <div className="subscribe-content">
                            <h2>Stay Informed</h2>
                            <p>Get notified about service status changes and incidents</p>
                            <div className="subscribe-options">
                                <button className="subscribe-btn email">Email Updates</button>
                                <button className="subscribe-btn slack">Slack Notifications</button>
                                <button className="subscribe-btn webhook">Webhook</button>
                            </div>
                        </div>
                    </div>

                    <div className="api-docs-cta">
                        <div className="docs-content">
                            <h2>API Documentation</h2>
                            <p>Explore our comprehensive API documentation and integration guides</p>
                            <button className="docs-btn">View API Documentation</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default ApiStatus;