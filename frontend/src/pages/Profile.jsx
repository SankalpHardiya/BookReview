import React, { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { bookApi } from '../utils/api'
import BookCard from '../components/BookCard'
import '../styles/books.css'

const Profile = () => {
  const { user, isAuthenticated } = useAuth()
  const [userBooks, setUserBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('books')
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  useEffect(() => {
    fetchUserBooks()
  }, [])
  
  const fetchUserBooks = async () => {
    try {
      setLoading(true)
      // Note: This assumes your API supports filtering by user
      // You might need to modify your backend to support this endpoint
      const response = await bookApi.getAll()
      const allBooks = response.data
      
      // Filter books added by current user on frontend
      // Ideally, this should be done on backend with a dedicated endpoint
      const currentUserBooks = allBooks.filter(book => 
        book.user._id === user._id || book.user === user._id
      )
      
      setUserBooks(currentUserBooks)
    } catch (error) {
      setError('Failed to fetch your books')
      console.error('Error fetching user books:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookApi.delete(bookId)
        setUserBooks(prev => prev.filter(book => book._id !== bookId))
      } catch (error) {
        setError('Failed to delete book')
      }
    }
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  return (
    <div className="container">
      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-avatar">
              <span className="avatar-initial">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="profile-details">
              <h1>{user?.name}</h1>
              <p className="profile-email">{user?.email}</p>
              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-number">{userBooks.length}</span>
                  <span className="stat-label">Books Added</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
                  </span>
                  <span className="stat-label">Member Since</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="profile-actions">
            <Link to="/add-book" className="btn btn-primary">
              Add New Book
            </Link>
          </div>
        </div>
        
        <div className="profile-content">
          <div className="profile-tabs">
            <button
              className={`tab-btn ${activeTab === 'books' ? 'active' : ''}`}
              onClick={() => setActiveTab('books')}
            >
              My Books ({userBooks.length})
            </button>
            <button
              className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              Recent Activity
            </button>
          </div>
          
          <div className="tab-content">
            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}
            
            {activeTab === 'books' && (
              <div className="my-books-section">
                {loading ? (
                  <div className="loading">
                    <div className="spinner"></div>
                  </div>
                ) : userBooks.length === 0 ? (
                  <div className="no-books">
                    <h3>No books added yet</h3>
                    <p>Start building your book collection by adding your first book!</p>
                    <Link to="/add-book" className="btn btn-primary">
                      Add Your First Book
                    </Link>
                  </div>
                ) : (
                  <div className="books-grid">
                    {userBooks.map((book) => (
                      <div key={book._id} className="user-book-card">
                        <BookCard book={book} />
                        <div className="book-card-actions">
                          <Link 
                            to={`/edit-book/${book._id}`} 
                            className="btn btn-sm btn-secondary"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteBook(book._id)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'activity' && (
              <div className="activity-section">
                <div className="activity-placeholder">
                  <h3>Recent Activity</h3>
                  <p>Your recent activity will appear here.</p>
                  <ul className="activity-list">
                    <li>Feature coming soon - View your recent book additions</li>
                    <li>Feature coming soon - View your recent reviews</li>
                    <li>Feature coming soon - View books you've bookmarked</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
