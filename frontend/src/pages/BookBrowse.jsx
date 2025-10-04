import React, { useState, useEffect } from 'react'
import BookCard from '../components/BookCard'
import { bookApi } from '../utils/api'
import '../styles/books.css'
import '../styles/homepage.css'


const BookBrowse = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  
  const limit = 9 // More books per page for browsing
  
  useEffect(() => {
    fetchBooks()
  }, [page, searchTerm])
  
  const fetchBooks = async (reset = false) => {
    try {
      setLoading(true)
      setError('')
      
      const params = {
        page: reset ? 1 : page,
        limit,
        ...(searchTerm && { search: searchTerm })
      }
      
      const response = await bookApi.getAll(params)
      const newBooks = response.data
      
      if (reset || page === 1) {
        setBooks(newBooks)
      } else {
        setBooks(prevBooks => [...prevBooks, ...newBooks])
      }
      
      setHasMore(newBooks.length === limit)
      if (reset) setPage(1)
      
    } catch (error) {
      console.error('Error fetching books:', error)
      setError('Failed to load books. Please try again.')
      
      if (page === 1 || reset) {
        setBooks([])
      }
    } finally {
      setLoading(false)
    }
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    fetchBooks(true)
  }
  
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
  }
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    if (e.target.value === '') {
      setPage(1)
      fetchBooks(true)
    }
  }
  
  return (
    <div className="container">
      <div className="book-list-header">
        <h1>Browse Our Book Collection</h1>
        <p>Discover amazing books from our community</p>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-group">
            <input
              type="text"
              placeholder="Search books by title, author, or genre..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button type="submit" className="btn btn-primary search-btn">
              Search
            </button>
          </div>
        </form>
      </div>
      
      {error && (
        <div className="alert alert-error">
          <div className="error-content">
            <strong>Unable to load books:</strong> {error}
            <button 
              onClick={() => fetchBooks(true)}
              className="btn btn-sm btn-outline"
              style={{ marginLeft: '1rem' }}
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      {loading && page === 1 ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading books...</p>
        </div>
      ) : (
        <>
          {books.length === 0 && !loading && !error ? (
            <div className="no-books">
              <h3>No books available</h3>
              <p>
                {searchTerm 
                  ? 'No books match your search. Try different keywords.' 
                  : 'No books have been added yet. Be the first to share a book!'
                }
              </p>
            </div>
          ) : books.length > 0 ? (
            <>
              <div className="books-grid">
                {books.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
              
              {hasMore && (
                <div className="load-more-container">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="btn btn-outline load-more-btn"
                  >
                    {loading ? 'Loading...' : 'Load More Books'}
                  </button>
                </div>
              )}
            </>
          ) : null}
        </>
      )}
    </div>
  )
}

export default BookBrowse
