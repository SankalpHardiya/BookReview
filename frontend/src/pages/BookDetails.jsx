import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { bookApi, reviewApi } from '../utils/api'
import StarRating from '../components/StarRating'
import '../styles/books.css'

const BookDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  
  const [book, setBook] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    text: ''
  })
  const [submittingReview, setSubmittingReview] = useState(false)
  const [editingReview, setEditingReview] = useState(null)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  
  useEffect(() => {
    if (id) {
      fetchBookDetails()
      fetchReviews()
    } else {
      setError('Invalid book ID')
      setLoading(false)
    }
  }, [id])
  
  const fetchBookDetails = async () => {
    try {
      console.log('Fetching book with ID:', id)
      const response = await bookApi.getById(id)
      console.log('Book details response:', response.data)
      setBook(response.data)
      setError('')
    } catch (error) {
      console.error('Error fetching book:', error)
      if (error.response?.status === 404) {
        setError('Book not found. It may have been deleted or the link is invalid.')
      } else if (error.response?.status === 500) {
        setError('Server error. Please try again later.')
      } else {
        setError('Failed to load book details. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }
  
  const fetchReviews = async () => {
    try {
      const response = await bookApi.getReviews(id)
      setReviews(response.data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }
  
  const handleDeleteBook = async () => {
    if (window.confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
      try {
        await bookApi.delete(id)
        navigate('/')
      } catch (error) {
        setError('Failed to delete book. Please try again.')
      }
    }
  }
  
  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      setShowLoginPrompt(true)
      return
    }
    
    if (!reviewForm.rating) {
      setError('Please provide a rating')
      return
    }
    
    setSubmittingReview(true)
    setError('')
    
    try {
      if (editingReview) {
        await reviewApi.update(editingReview._id, reviewForm)
        setEditingReview(null)
      } else {
        await reviewApi.create({
          bookId: id,
          ...reviewForm
        })
      }
      
      setReviewForm({ rating: 0, text: '' })
      fetchReviews()
      fetchBookDetails()
      
    } catch (error) {
      setError('Failed to submit review. Please try again.')
    } finally {
      setSubmittingReview(false)
    }
  }
  
  const handleEditReview = (review) => {
    setEditingReview(review)
    setReviewForm({
      rating: review.rating,
      text: review.text
    })
    setError('')
  }
  
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewApi.delete(reviewId)
        fetchReviews()
        fetchBookDetails()
        setError('')
      } catch (error) {
        setError('Failed to delete review. Please try again.')
      }
    }
  }
  
  const handleLoginPrompt = () => {
    setShowLoginPrompt(false)
    navigate('/login', { state: { from: location } })
  }
  
  const userReview = reviews.find(review => review.user._id === user?._id)
  const canReview = isAuthenticated && !userReview && !editingReview
  const isBookOwner = isAuthenticated && user?._id === book?.user?._id
  
  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading book details...</p>
        </div>
      </div>
    )
  }
  
  if (error && !book) {
    return (
      <div className="container">
        <div className="error-container">
          <div className="alert alert-error">
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
          </div>
          <div className="error-actions">
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Go to Home
            </button>
            <button onClick={() => window.location.reload()} className="btn btn-secondary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  if (!book) {
    return (
      <div className="container">
        <div className="error-container">
          <div className="alert alert-error">
            <h3>Book Not Found</h3>
            <p>The book you're looking for doesn't exist or has been removed.</p>
          </div>
          <div className="error-actions">
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Browse All Books
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container">
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}
      
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Login Required</h3>
            <p>You need to be logged in to write a review.</p>
            <div className="modal-actions">
              <button onClick={handleLoginPrompt} className="btn btn-primary">
                Login
              </button>
              <Link to="/signup" className="btn btn-secondary">
                Sign Up
              </Link>
              <button 
                onClick={() => setShowLoginPrompt(false)} 
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="book-details">
        <div className="book-details-header">
          <div className="book-info">
            <h1>{book.title}</h1>
            <p className="book-author">by {book.author}</p>
            <div className="book-meta">
              <span className="genre-tag">{book.genre}</span>
              <span className="published-year">Published: {book.publishedYear}</span>
            </div>
            <div className="book-rating-large">
              <StarRating rating={book.avgRating || 0} readonly size="large" />
              <span className="rating-text">
                {book.avgRating > 0 
                  ? `${book.avgRating.toFixed(1)}/5 (${reviews.length} reviews)`
                  : 'No reviews yet'
                }
              </span>
            </div>
          </div>
          
          {/* Only show edit/delete buttons to book owner */}
          {isBookOwner && (
            <div className="book-actions">
              <Link 
                to={`/edit-book/${book._id}`} 
                className="btn btn-secondary"
              >
                Edit Book
              </Link>
              <button 
                onClick={handleDeleteBook} 
                className="btn btn-danger"
              >
                Delete Book
              </button>
            </div>
          )}
        </div>
        
        <div className="book-description">
          <h3>Description</h3>
          <p>{book.description}</p>
        </div>
        
        <div className="book-added-by">
          <p>Added by: <strong>{book.user?.name || 'Unknown'}</strong></p>
        </div>
      </div>
      
      <div className="reviews-section">
        <h3>Reviews ({reviews.length})</h3>
        
        {/* Show review form if logged in and eligible, or login prompt if not */}
        {canReview ? (
          <div className="review-form-container">
            <h4>Write a Review</h4>
            <form onSubmit={handleReviewSubmit} className="review-form">
              <div className="form-group">
                <label className="form-label">Rating</label>
                <StarRating
                  rating={reviewForm.rating}
                  onRatingChange={(rating) => setReviewForm(prev => ({ ...prev, rating }))}
                  size="large"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="reviewText" className="form-label">
                  Your Review
                </label>
                <textarea
                  id="reviewText"
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, text: e.target.value }))}
                  className="form-control"
                  rows="4"
                  placeholder="Share your thoughts about this book..."
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={submittingReview}
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        ) : editingReview ? (
          <div className="review-form-container">
            <h4>Edit Your Review</h4>
            <form onSubmit={handleReviewSubmit} className="review-form">
              <div className="form-group">
                <label className="form-label">Rating</label>
                <StarRating
                  rating={reviewForm.rating}
                  onRatingChange={(rating) => setReviewForm(prev => ({ ...prev, rating }))}
                  size="large"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="reviewText" className="form-label">
                  Your Review
                </label>
                <textarea
                  id="reviewText"
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, text: e.target.value }))}
                  className="form-control"
                  rows="4"
                  placeholder="Share your thoughts about this book..."
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={submittingReview}
                >
                  {submittingReview ? 'Updating...' : 'Update Review'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingReview(null)
                    setReviewForm({ rating: 0, text: '' })
                    setError('')
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : !isAuthenticated ? (
          <div className="login-prompt">
            <h4>Want to write a review?</h4>
            <p>Please log in or create an account to share your thoughts about this book.</p>
            <div className="prompt-actions">
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-outline">
                Sign Up
              </Link>
            </div>
          </div>
        ) : userReview ? (
          <div className="user-review-note">
            <p>You have already reviewed this book. You can edit or delete your review below.</p>
          </div>
        ) : null}
        
        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p className="no-reviews">
              No reviews yet. Be the first to review this book!
            </p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="review-card">
                <div className="review-header">
                  <div className="review-user">
                    <strong>{review.user?.name || 'Anonymous'}</strong>
                    <StarRating rating={review.rating} readonly />
                  </div>
                  <div className="review-meta">
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                    {/* Only show edit/delete buttons to review owner */}
                    {isAuthenticated && user?._id === review.user?._id && (
                      <div className="review-actions">
                        <button
                          onClick={() => handleEditReview(review)}
                          className="btn btn-sm btn-secondary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {review.text && (
                  <div className="review-text">
                    <p>{review.text}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default BookDetails
