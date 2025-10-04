import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { bookApi } from '../utils/api'
import '../styles/homepage.css'

const Homepage = () => {
  const { isAuthenticated, user } = useAuth()
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalReviews: 0,
    totalUsers: 0
  })
  const [loading, setLoading] = useState(true)
  
  const location = useLocation()
  const successMessage = location.state?.message
  const messageType = location.state?.type

  useEffect(() => {
    fetchStats()
  }, [])

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        window.history.replaceState({}, document.title)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  const fetchStats = async () => {
    try {
      // Fetch basic stats - you might need to create these endpoints in your backend
      const response = await bookApi.getAll({ limit: 100 }) // Get more books to count
      setStats(prevStats => ({
        ...prevStats,
        totalBooks: response.data.length
      }))
    } catch (error) {
      console.log('Could not fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      icon: "📚",
      title: "Discover Books",
      description: "Explore a vast collection of books across all genres, curated by our community of readers."
    },
    {
      icon: "⭐",
      title: "Rate & Review",
      description: "Share your thoughts and rate books to help others discover their next great read."
    },
    {
      icon: "➕",
      title: "Add Books",
      description: "Contribute to our growing library by adding your favorite books and recommendations."
    },
    {
      icon: "🔍",
      title: "Smart Search",
      description: "Find books easily by title, author, genre, or keywords with our intelligent search."
    },
    {
      icon: "👥",
      title: "Community Driven",
      description: "Join a community of book lovers sharing recommendations and insightful reviews."
    },
    {
      icon: "📱",
      title: "User Friendly",
      description: "Enjoy a clean, modern interface designed for the best reading discovery experience."
    }
  ]

  const howItWorks = [
    {
      step: 1,
      title: "Sign Up",
      description: "Create your free account to start your book discovery journey."
    },
    {
      step: 2,
      title: "Explore",
      description: "Browse through our collection or search for specific books you love."
    },
    {
      step: 3,
      title: "Review",
      description: "Rate books and share your thoughts to help the community."
    },
    {
      step: 4,
      title: "Contribute",
      description: "Add new books to expand our ever-growing library."
    }
  ]

  return (
    <div className="homepage">
      {successMessage && (
        <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-info'} homepage-alert`}>
          <div className="success-content">
            <div className="success-icon">🎉</div>
            <div className="success-text">{successMessage}</div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Discover Your Next
                <span className="highlight"> Great Read</span>
              </h1>
              <p className="hero-description">
                Join thousands of book lovers in our community-driven platform. 
                Discover, review, and share amazing books with fellow readers around the world.
              </p>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">{loading ? '...' : stats.totalBooks}+</span>
                  <span className="stat-label">Books</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{loading ? '...' : '150+' }</span>
                  <span className="stat-label">Reviews</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{loading ? '...' : '50+'}</span>
                  <span className="stat-label">Readers</span>
                </div>
              </div>

              <div className="hero-actions">
                {isAuthenticated ? (
                  <>
                    <Link to="/books" className="btn btn-primary btn-large">
                      Browse Books
                    </Link>
                    <Link to="/add-book" className="btn btn-outline btn-large">
                      Add a Book
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/signup" className="btn btn-primary btn-large">
                      Get Started Free
                    </Link>
                    <Link to="/books" className="btn btn-outline btn-large">
                      Browse Books
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="hero-visual">
              <div className="book-stack">
                <div className="book book-1">📖</div>
                <div className="book book-2">📚</div>
                <div className="book book-3">📓</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose BookReview?</h2>
            <p>Everything you need to discover and share amazing books</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Get started in just a few simple steps</p>
          </div>

          <div className="steps-container">
            {howItWorks.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.step}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Reading Journey?</h2>
            <p>
              {isAuthenticated 
                ? `Welcome back, ${user?.name}! Ready to discover your next favorite book?`
                : "Join thousands of readers who have already discovered their next favorite books."
              }
            </p>
            
            <div className="cta-actions">
              {isAuthenticated ? (
                <>
                  <Link to="/books" className="btn btn-primary btn-large">
                    Explore Books
                  </Link>
                  <Link to="/profile" className="btn btn-outline btn-large">
                    My Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup" className="btn btn-primary btn-large">
                    Join Now - It's Free!
                  </Link>
                  <Link to="/login" className="btn btn-outline btn-large">
                    Already a Member?
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links-section">
        <div className="container">
          <div className="quick-links-grid">
            <div className="quick-link-card">
              <h3>📚 Browse Library</h3>
              <p>Explore our growing collection of books</p>
              <Link to="/books" className="quick-link">
                View All Books →
              </Link>
            </div>
            
            {isAuthenticated && (
              <>
                <div className="quick-link-card">
                  <h3>➕ Add Book</h3>
                  <p>Share a book with our community</p>
                  <Link to="/add-book" className="quick-link">
                    Add New Book →
                  </Link>
                </div>
                
                <div className="quick-link-card">
                  <h3>👤 My Profile</h3>
                  <p>Manage your books and reviews</p>
                  <Link to="/profile" className="quick-link">
                    View Profile →
                  </Link>
                </div>
              </>
            )}
            
            {!isAuthenticated && (
              <div className="quick-link-card">
                <h3>🚀 Get Started</h3>
                <p>Join our community today</p>
                <Link to="/signup" className="quick-link">
                  Sign Up Free →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Homepage
