import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/header.css'

const Header = () => {
  const { user, logout, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const isActiveLink = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link'
  }

  if (loading) {
    return (
      <header className="header">
        <div className="container">
          <nav className="navbar">
            <Link to="/" className="navbar-brand">
              BookReview
            </Link>
            <div className="loading-auth">Loading...</div>
          </nav>
        </div>
      </header>
    )
  }

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="navbar-brand">
            BookReview
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
          
          <div className={`navbar-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link 
              to="/" 
              className={isActiveLink('/')}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/add-book" 
                  className={isActiveLink('/add-book')}
                  onClick={closeMobileMenu}
                >
                  Add Book
                </Link>
                <Link 
                  to="/profile" 
                  className={isActiveLink('/profile')}
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
                <div className="nav-user-info">
                  <span className="nav-text">
                    Hi, {user?.name}!
                  </span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="btn btn-outline nav-btn"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="btn btn-outline nav-btn"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-primary nav-btn"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
