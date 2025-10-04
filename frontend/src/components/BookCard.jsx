import React from 'react'
import { Link } from 'react-router-dom'
import StarRating from './StarRating'
import '../styles/books.css'

const BookCard = ({ book }) => {
  const {
    _id,
    title,
    author,
    description,
    genre,
    publishedYear,
    avgRating = 0,
    user
  } = book

  return (
    <div className="book-card">
      <div className="book-card-header">
        <h3 className="book-title">
          <Link to={`/books/${_id}`}>
            {title}
          </Link>
        </h3>
        <div className="book-meta">
          <span className="book-author">by {author}</span>
          <span className="book-year">({publishedYear})</span>
        </div>
      </div>
      
      <div className="book-card-body">
        <div className="book-genre">
          <span className="genre-tag">{genre}</span>
        </div>
        
        <p className="book-description">
          {description.length > 150 
            ? `${description.substring(0, 150)}...` 
            : description
          }
        </p>
        
        <div className="book-rating">
          <StarRating rating={avgRating} readonly />
          <span className="rating-text">
            {avgRating > 0 ? `${avgRating.toFixed(1)}/5` : 'No ratings yet'}
          </span>
        </div>
      </div>
      
      <div className="book-card-footer">
        <span className="added-by">
          Added by: {user?.name || 'Anonymous'}
        </span>
        <Link to={`/books/${_id}`} className="btn btn-primary btn-sm">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default BookCard
