const express = require('express');
const connectDB = require('./config/database');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(helmet());  // Security
app.use(cors());    // For frontend
app.use(morgan('combined'));  // Logging
app.use(express.json());  // Parse JSON
app.use(express.urlencoded({ extended: true }));  // Parse forms

// Static files and Views
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/employees', require('./routes/employees'));
app.use('/api/tasks', require('./routes/tasks'));

// Home redirect
app.get('/', (req, res) => {
  res.redirect('/api/employees/view');
});

// 404 Handler (catch-all for unmatched routes)
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error Handler (global)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});