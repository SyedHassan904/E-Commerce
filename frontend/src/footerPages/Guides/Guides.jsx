import React, { useState } from 'react';
import './guides.css';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const Guides = () => {
    const [activeCategory, setActiveCategory] = useState('getting-started');
    const [searchQuery, setSearchQuery] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('all');

    const guideCategories = [
        {
            id: 'getting-started',
            name: 'Getting Started',
            icon: '🚀',
            description: 'Begin your e-commerce journey',
            color: '#6E34C6'
        },
        {
            id: 'store-setup',
            name: 'Store Setup',
            icon: '🛍️',
            description: 'Build and customize your store',
            color: '#5146E5'
        },
        {
            id: 'products',
            name: 'Products & Inventory',
            icon: '📦',
            description: 'Manage your product catalog',
            color: '#FF6B35'
        },
        {
            id: 'marketing',
            name: 'Marketing & SEO',
            icon: '📈',
            description: 'Grow your business',
            color: '#4CAF50'
        },
        {
            id: 'orders',
            name: 'Orders & Shipping',
            icon: '🚚',
            description: 'Process and fulfill orders',
            color: '#2196F3'
        },
        {
            id: 'advanced',
            name: 'Advanced Features',
            icon: '⚡',
            description: 'Powerful tools and integrations',
            color: '#9C27B0'
        }
    ];

    const allGuides = [
        // Getting Started Guides
        {
            id: 'gs-1',
            title: 'Platform Overview & First Steps',
            description: 'Get familiar with our platform and take your first steps towards building your online store',
            category: 'getting-started',
            difficulty: 'beginner',
            duration: '10 min',
            steps: 5,
            featured: true,
            new: true
        },
        {
            id: 'gs-2',
            title: 'Account Setup & Verification',
            description: 'Complete your account setup and verification process to unlock all platform features',
            category: 'getting-started',
            difficulty: 'beginner',
            duration: '8 min',
            steps: 4,
            featured: false,
            new: false
        },
        {
            id: 'gs-3',
            title: 'Understanding Your Dashboard',
            description: 'Learn how to navigate and use your merchant dashboard effectively',
            category: 'getting-started',
            difficulty: 'beginner',
            duration: '12 min',
            steps: 6,
            featured: true,
            new: false
        },

        // Store Setup Guides
        {
            id: 'ss-1',
            title: 'Choosing Your Store Theme',
            description: 'Select and customize the perfect theme for your brand and products',
            category: 'store-setup',
            difficulty: 'beginner',
            duration: '15 min',
            steps: 7,
            featured: false,
            new: true
        },
        {
            id: 'ss-2',
            title: 'Custom Domain Setup',
            description: 'Connect your custom domain and configure DNS settings',
            category: 'store-setup',
            difficulty: 'intermediate',
            duration: '20 min',
            steps: 8,
            featured: true,
            new: false
        },
        {
            id: 'ss-3',
            title: 'Mobile Store Optimization',
            description: 'Optimize your store for mobile devices and improve user experience',
            category: 'store-setup',
            difficulty: 'intermediate',
            duration: '18 min',
            steps: 9,
            featured: false,
            new: false
        },

        // Products & Inventory Guides
        {
            id: 'pi-1',
            title: 'Adding Your First Products',
            description: 'Step-by-step guide to adding products with images, descriptions, and variants',
            category: 'products',
            difficulty: 'beginner',
            duration: '12 min',
            steps: 6,
            featured: true,
            new: false
        },
        {
            id: 'pi-2',
            title: 'Inventory Management Best Practices',
            description: 'Learn how to effectively manage inventory and prevent stockouts',
            category: 'products',
            difficulty: 'intermediate',
            duration: '25 min',
            steps: 11,
            featured: false,
            new: true
        },
        {
            id: 'pi-3',
            title: 'Bulk Product Import/Export',
            description: 'Import and export products in bulk using CSV files',
            category: 'products',
            difficulty: 'advanced',
            duration: '30 min',
            steps: 14,
            featured: false,
            new: false
        },

        // Marketing Guides
        {
            id: 'mk-1',
            title: 'SEO Optimization for E-commerce',
            description: 'Improve your search engine rankings and drive organic traffic',
            category: 'marketing',
            difficulty: 'intermediate',
            duration: '35 min',
            steps: 16,
            featured: true,
            new: false
        },
        {
            id: 'mk-2',
            title: 'Email Marketing Campaigns',
            description: 'Create effective email sequences that convert visitors into customers',
            category: 'marketing',
            difficulty: 'intermediate',
            duration: '28 min',
            steps: 12,
            featured: false,
            new: true
        },
        {
            id: 'mk-3',
            title: 'Social Media Integration',
            description: 'Connect your store with social media platforms for increased reach',
            category: 'marketing',
            difficulty: 'beginner',
            duration: '15 min',
            steps: 7,
            featured: false,
            new: false
        },

        // Orders & Shipping Guides
        {
            id: 'os-1',
            title: 'Order Processing Workflow',
            description: 'Streamline your order processing from receipt to fulfillment',
            category: 'orders',
            difficulty: 'beginner',
            duration: '20 min',
            steps: 8,
            featured: true,
            new: false
        },
        {
            id: 'os-2',
            title: 'Shipping Configuration & Rates',
            description: 'Set up shipping zones, methods, and calculate rates accurately',
            category: 'orders',
            difficulty: 'intermediate',
            duration: '25 min',
            steps: 10,
            featured: false,
            new: true
        },
        {
            id: 'os-3',
            title: 'Returns & Refunds Management',
            description: 'Handle returns, exchanges, and refunds efficiently',
            category: 'orders',
            difficulty: 'intermediate',
            duration: '22 min',
            steps: 9,
            featured: false,
            new: false
        },

        // Advanced Features Guides
        {
            id: 'af-1',
            title: 'API Integration & Webhooks',
            description: 'Connect third-party services and automate workflows using our API',
            category: 'advanced',
            difficulty: 'advanced',
            duration: '45 min',
            steps: 18,
            featured: true,
            new: false
        },
        {
            id: 'af-2',
            title: 'Custom Theme Development',
            description: 'Create and deploy custom themes using our development tools',
            category: 'advanced',
            difficulty: 'advanced',
            duration: '60 min',
            steps: 22,
            featured: false,
            new: true
        },
        {
            id: 'af-3',
            title: 'Advanced Analytics Setup',
            description: 'Set up custom analytics and tracking for deep business insights',
            category: 'advanced',
            difficulty: 'advanced',
            duration: '35 min',
            steps: 15,
            featured: false,
            new: false
        }
    ];

    const featuredGuides = allGuides.filter(guide => guide.featured);
    const newGuides = allGuides.filter(guide => guide.new);

    const filteredGuides = allGuides.filter(guide => {
        const matchesCategory = guide.category === activeCategory;
        const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guide.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty = difficultyFilter === 'all' || guide.difficulty === difficultyFilter;

        return matchesCategory && matchesSearch && matchesDifficulty;
    });

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'beginner': return '#4CAF50';
            case 'intermediate': return '#FF9800';
            case 'advanced': return '#F44336';
            default: return '#666';
        }
    };

    const getDifficultyIcon = (difficulty) => {
        switch (difficulty) {
            case 'beginner': return '🟢';
            case 'intermediate': return '🟡';
            case 'advanced': return '🔴';
            default: return '⚪';
        }
    };

    return (
        <>
            <Header />
            <Navbar />
            <div className="guides-page">
                <div className="guides-hero">
                    <div className="container">
                        <h1 className="guides-title">Guides & Tutorials</h1>
                        <p className="guides-subtitle">Learn how to build, grow, and optimize your e-commerce store</p>

                        <div className="search-section">
                            <div className="search-bar">
                                <input
                                    type="text"
                                    placeholder="Search guides, tutorials, and how-tos..."
                                    className="search-input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button className="search-button">Search</button>
                            </div>

                            <div className="filter-controls">
                                <select
                                    value={difficultyFilter}
                                    onChange={(e) => setDifficultyFilter(e.target.value)}
                                    className="difficulty-filter"
                                >
                                    <option value="all">All Levels</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="guides-content">
                    <div className="container">
                        {/* Featured Guides */}
                        {featuredGuides.length > 0 && (
                            <section className="featured-section">
                                <h2>Featured Guides</h2>
                                <div className="featured-grid">
                                    {featuredGuides.map(guide => (
                                        <div key={guide.id} className="featured-card">
                                            {guide.new && <div className="new-badge">New</div>}
                                            <div className="featured-content">
                                                <h3>{guide.title}</h3>
                                                <p>{guide.description}</p>
                                                <div className="guide-meta">
                                                    <span className="difficulty" style={{ color: getDifficultyColor(guide.difficulty) }}>
                                                        {getDifficultyIcon(guide.difficulty)} {guide.difficulty}
                                                    </span>
                                                    <span className="duration">⏱️ {guide.duration}</span>
                                                    <span className="steps">📝 {guide.steps} steps</span>
                                                </div>
                                                <button className="start-guide-btn">Start Learning</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* New Guides */}
                        {newGuides.length > 0 && (
                            <section className="new-section">
                                <h2>Recently Added</h2>
                                <div className="new-grid">
                                    {newGuides.map(guide => (
                                        <div key={guide.id} className="new-card">
                                            <div className="new-badge">New</div>
                                            <h3>{guide.title}</h3>
                                            <p>{guide.description}</p>
                                            <div className="guide-meta">
                                                <span className="category">
                                                    {guideCategories.find(cat => cat.id === guide.category)?.icon}
                                                    {guideCategories.find(cat => cat.id === guide.category)?.name}
                                                </span>
                                            </div>
                                            <button className="explore-btn">Explore Guide</button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Main Guides Section */}
                        <section className="main-guides-section">
                            <div className="guides-header">
                                <h2>Browse All Guides</h2>
                                <div className="results-info">
                                    Showing {filteredGuides.length} guides in
                                    <span className="category-name">
                                        {guideCategories.find(cat => cat.id === activeCategory)?.name}
                                    </span>
                                </div>
                            </div>

                            <div className="guides-layout">
                                {/* Categories Sidebar */}
                                <div className="categories-sidebar">
                                    <h3>Categories</h3>
                                    <div className="category-list">
                                        {guideCategories.map(category => (
                                            <button
                                                key={category.id}
                                                className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
                                                onClick={() => setActiveCategory(category.id)}
                                                style={{
                                                    '--category-color': category.color,
                                                    borderLeftColor: activeCategory === category.id ? category.color : 'transparent'
                                                }}
                                            >
                                                <span className="category-icon">{category.icon}</span>
                                                <div className="category-info">
                                                    <span className="category-name">{category.name}</span>
                                                    <span className="category-desc">{category.description}</span>
                                                </div>
                                                <span className="guide-count">
                                                    {allGuides.filter(g => g.category === category.id).length}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Guides Grid */}
                                <div className="guides-grid-container">
                                    {filteredGuides.length > 0 ? (
                                        <div className="guides-grid">
                                            {filteredGuides.map(guide => (
                                                <div key={guide.id} className="guide-card">
                                                    {guide.new && <div className="new-badge">New</div>}
                                                    {guide.featured && <div className="featured-badge">Featured</div>}

                                                    <div className="guide-header">
                                                        <h3>{guide.title}</h3>
                                                        <span
                                                            className="difficulty-badge"
                                                            style={{ backgroundColor: getDifficultyColor(guide.difficulty) }}
                                                        >
                                                            {guide.difficulty}
                                                        </span>
                                                    </div>

                                                    <p className="guide-description">{guide.description}</p>

                                                    <div className="guide-meta">
                                                        <div className="meta-item">
                                                            <span className="meta-icon">⏱️</span>
                                                            {guide.duration}
                                                        </div>
                                                        <div className="meta-item">
                                                            <span className="meta-icon">📝</span>
                                                            {guide.steps} steps
                                                        </div>
                                                        <div className="meta-item">
                                                            <span className="meta-icon">
                                                                {guideCategories.find(cat => cat.id === guide.category)?.icon}
                                                            </span>
                                                            {guideCategories.find(cat => cat.id === guide.category)?.name}
                                                        </div>
                                                    </div>

                                                    <div className="guide-actions">
                                                        <button className="start-btn">Start Guide</button>
                                                        <button className="save-btn">Save for Later</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="no-results">
                                            <div className="no-results-icon">🔍</div>
                                            <h3>No guides found</h3>
                                            <p>Try adjusting your search or filters</p>
                                            <button
                                                className="reset-filters-btn"
                                                onClick={() => {
                                                    setSearchQuery('');
                                                    setDifficultyFilter('all');
                                                }}
                                            >
                                                Reset Filters
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Resources Section */}
                        <section className="resources-section">
                            <h2>Additional Learning Resources</h2>
                            <div className="resources-grid">
                                <div className="resource-card">
                                    <div className="resource-icon">🎥</div>
                                    <h3>Video Tutorials</h3>
                                    <p>Step-by-step video guides for visual learners</p>
                                    <div className="resource-stats">
                                        <span>50+ videos</span>
                                        <span>•</span>
                                        <span>10+ hours</span>
                                    </div>
                                    <button className="resource-btn">Browse Videos</button>
                                </div>

                                <div className="resource-card">
                                    <div className="resource-icon">📚</div>
                                    <h3>Knowledge Base</h3>
                                    <p>Comprehensive articles and troubleshooting guides</p>
                                    <div className="resource-stats">
                                        <span>200+ articles</span>
                                        <span>•</span>
                                        <span>Updated weekly</span>
                                    </div>
                                    <button className="resource-btn">Search Articles</button>
                                </div>

                                <div className="resource-card">
                                    <div className="resource-icon">👥</div>
                                    <h3>Community Forum</h3>
                                    <p>Connect with other merchants and experts</p>
                                    <div className="resource-stats">
                                        <span>10K+ members</span>
                                        <span>•</span>
                                        <span>Active community</span>
                                    </div>
                                    <button className="resource-btn">Join Community</button>
                                </div>

                                <div className="resource-card">
                                    <div className="resource-icon">🛠️</div>
                                    <h3>Developer Docs</h3>
                                    <p>Technical documentation for developers</p>
                                    <div className="resource-stats">
                                        <span>API references</span>
                                        <span>•</span>
                                        <span>SDK guides</span>
                                    </div>
                                    <button className="resource-btn">View Documentation</button>
                                </div>
                            </div>
                        </section>

                        {/* CTA Section */}
                        <section className="cta-section">
                            <div className="cta-content">
                                <h2>Need Personalized Help?</h2>
                                <p>Our experts are ready to provide one-on-one guidance and answer your specific questions.</p>
                                <div className="cta-buttons">
                                    <button className="primary-cta">Schedule Expert Call</button>
                                    <button className="secondary-cta">Contact Support</button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Guides;