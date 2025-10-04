
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// env file 
dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

//auth routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use("/api/books", require('./routes/bookRoutes'));

// check
app.get('/', (req, res) => res.json({ msg: 'API running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
