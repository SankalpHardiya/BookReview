# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# BookReview - Frontend

A modern React application for discovering, reviewing, and sharing books with a community of readers.

## Features

- 🏠 Modern homepage with feature showcase
- 📚 Browse books with search and pagination
- ⭐ Rate and review books (login required)
- ➕ Add new books (login required)
- ✏️ Edit/delete your own books and reviews
- 👤 User authentication (login/signup)
- 📱 Responsive design for all devices

## Tech Stack

- React 18
- React Router DOM v6
- Axios for API calls
- CSS3 with modern styling
- Vite for development

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository
1. Clone the repository
git clone <your-repo-url>
cd frontend

text

2. Install dependencies
npm install

text

3. Start the development server
npm run dev

text

4. Open http://localhost:3000 in your browser

## Environment Variables

Create a `.env` file in the root directory:
VITE_API_URL=http://localhost:5000/api

text

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Routes

- `/` - Homepage with features
- `/books` - Browse all books
- `/books/:id` - Book details and reviews
- `/login` - User login
- `/signup` - User registration
- `/add-book` - Add new book (protected)
- `/edit-book/:id` - Edit book (protected)
- `/profile` - User profile (protected)