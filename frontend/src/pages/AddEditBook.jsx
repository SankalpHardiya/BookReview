// import React, { useState, useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'
// import { bookApi } from '../utils/api'
// import '../styles/books.css'

// const AddEditBook = () => {
//   const navigate = useNavigate()
//   const { id } = useParams()
//   const { isAuthenticated } = useAuth()
  
//   const isEditing = Boolean(id)
  
//   const [formData, setFormData] = useState({
//     title: '',
//     author: '',
//     description: '',
//     genre: '',
//     publishedYear: new Date().getFullYear()
//   })
  
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')
  
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login')
//       return
//     }
    
//     if (isEditing) {
//       fetchBook()
//     }
//   }, [id, isAuthenticated, navigate])
  
//   const fetchBook = async () => {
//     try {
//       setLoading(true)
//       const response = await bookApi.getById(id)
//       const book = response.data
      
//       setFormData({
//         title: book.title,
//         author: book.author,
//         description: book.description,
//         genre: book.genre,
//         publishedYear: book.publishedYear
//       })
//     } catch (error) {
//       setError('Failed to fetch book details')
//       console.error('Error fetching book:', error)
//     } finally {
//       setLoading(false)
//     }
//   }
  
//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//     // Clear messages when user starts typing
//     if (error) setError('')
//     if (success) setSuccess('')
//   }
  
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError('')
//     setSuccess('')
//     setLoading(true)
    
//     // Validate form
//     if (!formData.title.trim() || !formData.author.trim() || !formData.description.trim()) {
//       setError('Please fill in all required fields')
//       setLoading(false)
//       return
//     }
    
//     const currentYear = new Date().getFullYear()
//     if (formData.publishedYear < 1000 || formData.publishedYear > currentYear) {
//       setError('Please enter a valid publication year')
//       setLoading(false)
//       return
//     }
    
//     try {
//       const bookData = {
//         title: formData.title.trim(),
//         author: formData.author.trim(),
//         description: formData.description.trim(),
//         genre: formData.genre,
//         publishedYear: parseInt(formData.publishedYear)
//       }
      
//       console.log('Submitting book data:', bookData) // Debug log
      
//       let response
//       if (isEditing) {
//         response = await bookApi.update(id, bookData)
//         setSuccess('Book updated successfully!')
//       } else {
//         response = await bookApi.create(bookData)
//         setSuccess('Book created successfully!')
//       }
      
//       console.log('API Response:', response.data) // Debug log
      
//       // Handle different possible response structures
//       let bookId = null
//       if (response.data) {
//         // Try different possible response structures
//         if (response.data._id) {
//           bookId = response.data._id
//         } else if (response.data.book && response.data.book._id) {
//           bookId = response.data.book._id
//         } else if (response.data.id) {
//           bookId = response.data.id
//         } else if (response.data.book && response.data.book.id) {
//           bookId = response.data.book.id
//         }
//       }
      
//       console.log('Extracted book ID:', bookId) // Debug log
      
//       // Wait a moment before navigation to ensure the book is saved
//       setTimeout(() => {
//         if (bookId) {
//           navigate(`/books/${bookId}`)
//         } else {
//           // If we can't get the book ID, navigate to home page
//           navigate('/')
//         }
//       }, 1000)
      
//     } catch (error) {
//       console.error('Error submitting book:', error) // Debug log
//       console.error('Error response:', error.response) // Debug log
      
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error || 
//                           `Failed to ${isEditing ? 'update' : 'create'} book`
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }
  
//   if (!isAuthenticated) {
//     return null // Will redirect to login
//   }
  
//   const genres = [
//     'Fiction', 'Non-Fiction', 'Mystery', 'Thriller', 'Romance', 
//     'Science Fiction', 'Fantasy', 'Biography', 'History', 'Self-Help',
//     'Business', 'Education', 'Poetry', 'Drama', 'Adventure',
//     'Horror', 'Comedy', 'Philosophy', 'Religion', 'Other'
//   ]
  
//   return (
//     <div className="container">
//       <div className="add-edit-book">
//         <div className="form-header">
//           <h1>{isEditing ? 'Edit Book' : 'Add New Book'}</h1>
//           <p>
//             {isEditing 
//               ? 'Update the book information below'
//               : 'Share a great book with the community'
//             }
//           </p>
//         </div>
        
//         {error && (
//           <div className="alert alert-error">
//             {error}
//           </div>
//         )}
        
//         {success && (
//           <div className="alert alert-success">
//             {success}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="book-form">
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="title" className="form-label">
//                 Book Title *
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="form-control"
//                 placeholder="Enter the book title"
//                 required
//                 disabled={loading}
//               />
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="author" className="form-label">
//                 Author *
//               </label>
//               <input
//                 type="text"
//                 id="author"
//                 name="author"
//                 value={formData.author}
//                 onChange={handleChange}
//                 className="form-control"
//                 placeholder="Enter the author's name"
//                 required
//                 disabled={loading}
//               />
//             </div>
//           </div>
          
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="genre" className="form-label">
//                 Genre
//               </label>
//               <select
//                 id="genre"
//                 name="genre"
//                 value={formData.genre}
//                 onChange={handleChange}
//                 className="form-control"
//                 disabled={loading}
//               >
//                 <option value="">Select a genre</option>
//                 {genres.map(genre => (
//                   <option key={genre} value={genre}>
//                     {genre}
//                   </option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="publishedYear" className="form-label">
//                 Published Year
//               </label>
//               <input
//                 type="number"
//                 id="publishedYear"
//                 name="publishedYear"
//                 value={formData.publishedYear}
//                 onChange={handleChange}
//                 className="form-control"
//                 min="1000"
//                 max={new Date().getFullYear()}
//                 placeholder="e.g., 2023"
//                 disabled={loading}
//               />
//             </div>
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="description" className="form-label">
//               Description *
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="form-control"
//               rows="6"
//               placeholder="Write a compelling description of the book..."
//               required
//               disabled={loading}
//             />
//           </div>
          
//           <div className="form-actions">
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="btn btn-secondary"
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="btn btn-primary"
//               disabled={loading}
//             >
//               {loading 
//                 ? (isEditing ? 'Updating...' : 'Adding...') 
//                 : (isEditing ? 'Update Book' : 'Add Book')
//               }
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AddEditBook
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { bookApi } from '../utils/api'
import '../styles/books.css'

const AddEditBook = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  
  const isEditing = Boolean(id)
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    publishedYear: new Date().getFullYear()
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    
    if (isEditing) {
      fetchBook()
    }
  }, [id, isAuthenticated, navigate])
  
  const fetchBook = async () => {
    try {
      setLoading(true)
      const response = await bookApi.getById(id)
      const book = response.data
      
      setFormData({
        title: book.title,
        author: book.author,
        description: book.description,
        genre: book.genre,
        publishedYear: book.publishedYear
      })
    } catch (error) {
      setError('Failed to fetch book details')
      console.error('Error fetching book:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear messages when user starts typing
    if (error) setError('')
    if (success) setSuccess('')
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    
    // Validate form
    if (!formData.title.trim() || !formData.author.trim() || !formData.description.trim()) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }
    
    const currentYear = new Date().getFullYear()
    if (formData.publishedYear < 1000 || formData.publishedYear > currentYear) {
      setError('Please enter a valid publication year')
      setLoading(false)
      return
    }
    
    try {
      const bookData = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        description: formData.description.trim(),
        genre: formData.genre,
        publishedYear: parseInt(formData.publishedYear)
      }
      
      console.log('Submitting book data:', bookData)
      
      let response
      if (isEditing) {
        response = await bookApi.update(id, bookData)
        setSuccess('Book updated successfully!')
        
        // For editing, navigate back to the book details page after a delay
        setTimeout(() => {
          navigate(`/books/${id}`)
        }, 1500)
        
      } else {
        response = await bookApi.create(bookData)
        setSuccess('Book created successfully! Redirecting to home page...')
        
        console.log('Book creation response:', response.data)
        
        // For new book creation, navigate to home page instead of book details
        // This avoids the timing issue where the book might not be immediately available
        setTimeout(() => {
          navigate('/', { 
            state: { 
              message: `"${bookData.title}" has been added successfully!`,
              type: 'success'
            }
          })
        }, 1500)
      }
      
    } catch (error) {
      console.error('Error submitting book:', error)
      console.error('Error response:', error.response)
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          `Failed to ${isEditing ? 'update' : 'create'} book`
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }
  
  if (!isAuthenticated) {
    return null
  }
  
  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Thriller', 'Romance', 
    'Science Fiction', 'Fantasy', 'Biography', 'History', 'Self-Help',
    'Business', 'Education', 'Poetry', 'Drama', 'Adventure',
    'Horror', 'Comedy', 'Philosophy', 'Religion', 'Other'
  ]
  
  return (
    <div className="container">
      <div className="add-edit-book">
        <div className="form-header">
          <h1>{isEditing ? 'Edit Book' : 'Add New Book'}</h1>
          <p>
            {isEditing 
              ? 'Update the book information below'
              : 'Share a great book with the community'
            }
          </p>
        </div>
        
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        
        {success && (
          <div className="alert alert-success">
            <div className="success-content">
              <div className="success-icon">✅</div>
              <div className="success-text">{success}</div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Book Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter the book title"
                required
                disabled={loading || success}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="author" className="form-label">
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter the author's name"
                required
                disabled={loading || success}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="genre" className="form-label">
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="form-control"
                disabled={loading || success}
              >
                <option value="">Select a genre</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="publishedYear" className="form-label">
                Published Year
              </label>
              <input
                type="number"
                id="publishedYear"
                name="publishedYear"
                value={formData.publishedYear}
                onChange={handleChange}
                className="form-control"
                min="1000"
                max={new Date().getFullYear()}
                placeholder="e.g., 2023"
                disabled={loading || success}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows="6"
              placeholder="Write a compelling description of the book..."
              required
              disabled={loading || success}
            />
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-secondary"
              disabled={loading || success}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || success}
            >
              {loading 
                ? (isEditing ? 'Updating...' : 'Adding...') 
                : success
                ? 'Success!'
                : (isEditing ? 'Update Book' : 'Add Book')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEditBook
