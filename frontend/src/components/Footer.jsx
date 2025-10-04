import React from 'react'
import '../styles/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BookReview</h3>
            <p>Discover and share your favorite books with our community.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/books">Browse Books</a></li>
              <li><a href="/add-book">Add Book</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@bookreview.com</p>
            <p>Phone: +91 12345 67890</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 BookReview. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
