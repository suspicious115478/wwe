// app.js
const express = require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./dataRoutes'); // Correct: Import dataRoutes here

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(bodyParser.json()); // Middleware for parsing JSON request bodies

// Mount the dataRoutes router
// This means all routes in dataRoutes.js will be prefixed with /api/data
app.use('/api/data', dataRoutes);

// Simple root route
app.get('/', (req, res) => {
  res.send('Firebase Realtime Database API is running!');
});

// Simple health check route
app.get('/health', (req, res) => {
  res.status(200).send('Health check OK!');
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
  console.log(`Open in browser: http://localhost:${PORT} (for local testing)`);
});
