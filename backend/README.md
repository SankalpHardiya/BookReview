# BookReview - Backend API

RESTful API server for the BookReview application built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT-based authentication
- 📚 CRUD operations for books
- ⭐ Review system with ratings
- 🔍 Search and pagination
- 🛡️ Protected routes and authorization
- 📝 Input validation and error handling

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation

1. Clone the repository
git clone <your-repo-url>
cd backend

text

2. Install dependencies
npm install

text

3. Create `.env` file in root directory:
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

text

4. Start the server
npm start

text

Server runs on http://localhost:5000

## API Routes

### Authentication Routes
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Book Routes
- `GET /api/books` - Get all books (public)
- `GET /api/books/:id` - Get single book (public)
- `POST /api/books` - Add new book (protected)
- `PUT /api/books/:id` - Update book (owner only)
- `DELETE /api/books/:id` - Delete book (owner only)
- `GET /api/books/:id/reviews` - Get book reviews

### Review Routes
- `POST /api/reviews` - Add review (protected)
- `PUT /api/reviews/:id` - Update review (owner only)
- `DELETE /api/reviews/:id` - Delete review (owner only)

## Request Examples

### Register User
OST /api/auth/signup
{
"name": "John Doe",
"email": "john@example.com",
"password": "password123"
}

text

### Add Book
POST /api/books
Headers: Authorization: Bearer <token>
{
"title": "Book Title",
"author": "Author Name",
"description": "Book description",
"genre": "Fiction",
"publishedYear": 2023
}

text

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Database Models

- **User**: name, email, password
- **Book**: title, author, description, genre, publishedYear, user, avgRating
- **Review**: user, book, rating, text, createdAt