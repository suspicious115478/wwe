// app.js
const express = require('express');
const bodyParser = require('body-parser'); // To parse JSON request bodies
const dataRoutes = require('./routes/dataRoutes'); // Import your data routes

const app = express();
const PORT = process.env.PORT || 3000; // Use environment port or default to 3000

// Middleware
app.use(bodyParser.json()); // Enable JSON body parsing

// Routes
app.use('/api/data', dataRoutes); // All routes defined in dataRoutes will be prefixed with /api/data

// Basic health check route
app.get('/', (req, res) => {
  res.send('Firebase Realtime Database API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
