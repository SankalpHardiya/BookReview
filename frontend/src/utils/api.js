// // import axios from 'axios'

// // const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// // export const api = axios.create({
// //   baseURL,
// //   headers: {
// //     'Content-Type': 'application/json'
// //   }
// // })

// // // Request interceptor to add token to requests
// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem('token')
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`
// //     }
// //     return config
// //   },
// //   (error) => {
// //     return Promise.reject(error)
// //   }
// // )

// // // Response interceptor to handle token expiration
// // api.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     if (error.response?.status === 401) {
// //       localStorage.removeItem('token')
// //       window.location.href = '/login'
// //     }
// //     return Promise.reject(error)
// //   }
// // )

// // // Book API functions
// // export const bookApi = {
// //   getAll: (params = {}) => api.get('/books', { params }),
// //   getById: (id) => api.get(`/books/${id}`),
// //   create: (data) => api.post('/books', data),
// //   update: (id, data) => api.put(`/books/${id}`, data),
// //   delete: (id) => api.delete(`/books/${id}`),
// //   getReviews: (id) => api.get(`/books/${id}/reviews`)
// // }

// // // Review API functions
// // export const reviewApi = {
// //   create: (data) => api.post('/reviews', data),
// //   update: (id, data) => api.put(`/reviews/${id}`, data),
// //   delete: (id) => api.delete(`/reviews/${id}`)
// // }
// import axios from 'axios'

// const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// export const api = axios.create({
//   baseURL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

// // Request interceptor to add token to requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// // Response interceptor - REMOVE automatic redirect to login
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Only remove token on 401, but don't redirect automatically
//     // Let individual components handle the redirect as needed
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token')
//       delete api.defaults.headers.common['Authorization']
//     }
//     return Promise.reject(error)
//   }
// )

// // Book API functions
// export const bookApi = {
//   getAll: (params = {}) => api.get('/books', { params }),
//   getById: (id) => api.get(`/books/${id}`),
//   create: (data) => api.post('/books', data),
//   update: (id, data) => api.put(`/books/${id}`, data),
//   delete: (id) => api.delete(`/books/${id}`),
//   getReviews: (id) => api.get(`/books/${id}/reviews`)
// }

// // Review API functions
// export const reviewApi = {
//   create: (data) => api.post('/reviews', data),
//   update: (id, data) => api.put(`/reviews/${id}`, data),
//   delete: (id) => api.delete(`/reviews/${id}`)
// }
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - REMOVE automatic redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only remove token on 401, but don't redirect automatically
    // Let individual components handle the redirect as needed
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    }
    return Promise.reject(error)
  }
)

// Book API functions
export const bookApi = {
  getAll: (params = {}) => api.get('/books', { params }),
  getById: (id) => api.get(`/books/${id}`),
  create: (data) => api.post('/books', data),
  update: (id, data) => api.put(`/books/${id}`, data),
  delete: (id) => api.delete(`/books/${id}`),
  getReviews: (id) => api.get(`/books/${id}/reviews`)
}

// Review API functions
export const reviewApi = {
  create: (data) => api.post('/reviews', data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`)
}
