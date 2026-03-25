const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/authJson');
const itemRoutes = require('./routes/itemsJson');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Static files - serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/auth', userRoutes);
app.use('/api/items', itemRoutes);

// Home route
app.get('/api', (req, res) => {
  res.json({ message: 'Campus Lost & Found API is running (JSON Storage)' });
});

// 404 handler
app.use((req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
  } else {
    res.status(404).json({ error: 'API endpoint not found' });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log('📁 Using JSON file storage (no MongoDB required)');
});
