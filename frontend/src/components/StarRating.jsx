import React, { useState } from 'react'

const StarRating = ({ rating = 0, onRatingChange, readonly = false, size = 'medium' }) => {
  const [hoveredRating, setHoveredRating] = useState(0)
  
  const sizeClasses = {
    small: 'star-rating-small',
    medium: 'star-rating-medium',
    large: 'star-rating-large'
  }
  
  const handleStarClick = (starRating) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating)
    }
  }
  
  const handleStarHover = (starRating) => {
    if (!readonly) {
      setHoveredRating(starRating)
    }
  }
  
  const handleMouseLeave = () => {
    if (!readonly) {
      setHoveredRating(0)
    }
  }
  
  const getStarClass = (starIndex) => {
    const currentRating = hoveredRating || rating
    if (currentRating >= starIndex) {
      return 'star star-filled'
    } else if (currentRating >= starIndex - 0.5) {
      return 'star star-half'
    }
    return 'star star-empty'
  }
  
  return (
    <div 
      className={`star-rating ${sizeClasses[size]} ${readonly ? 'readonly' : 'interactive'}`}
      onMouseLeave={handleMouseLeave}
    >
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <span
          key={starIndex}
          className={getStarClass(starIndex)}
          onClick={() => handleStarClick(starIndex)}
          onMouseEnter={() => handleStarHover(starIndex)}
        >
          ★
        </span>
      ))}
      
      <style jsx>{`
        .star-rating {
          display: inline-flex;
          align-items: center;
          gap: 2px;
        }
        
        .star {
          cursor: ${readonly ? 'default' : 'pointer'};
          transition: color 0.2s ease;
          user-select: none;
        }
        
        .star-filled {
          color: #fbbf24;
        }
        
        .star-half {
          color: #fbbf24;
        }
        
        .star-empty {
          color: #d1d5db;
        }
        
        .interactive .star:hover {
          color: #f59e0b;
        }
        
        .star-rating-small .star {
          font-size: 1rem;
        }
        
        .star-rating-medium .star {
          font-size: 1.25rem;
        }
        
        .star-rating-large .star {
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  )
}

export default StarRating
