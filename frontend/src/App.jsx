import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import BookList from './pages/BookList'
import BookDetails from './pages/BookDetails'
import AddEditBook from './pages/AddEditBook'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'

// Protected Route Component - only for routes that must require login
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Public Route Component - redirect if already authenticated (for login/signup pages)
const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }
  
  return !isAuthenticated ? children : <Navigate to="/" replace />
}

function AppContent() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Public Routes - accessible to everyone */}
          <Route path="/" element={<BookList />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          
          {/* Auth Routes - only accessible when not logged in */}
          <Route 
            path="/login" 
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <PublicOnlyRoute>
                <Signup />
              </PublicOnlyRoute>
            } 
          />
          
          {/* Protected Routes - only accessible when logged in */}
          <Route 
            path="/add-book" 
            element={
              <ProtectedRoute>
                <AddEditBook />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/edit-book/:id" 
            element={
              <ProtectedRoute>
                <AddEditBook />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
