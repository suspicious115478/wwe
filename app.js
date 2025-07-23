// app.js
const express = require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./dataRoutes'); // Keep this require for now, but we'll comment out its use

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(bodyParser.json());

// Temporarily comment out the dataRoutes middleware
// app.use('/api/data', dataRoutes);

// Add a super simple, absolutely unambiguous test route
app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

app.get('/', (req, res) => {
  res.send('Firebase Realtime Database API is running!');
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
  console.log(`Open in browser: http://localhost:${PORT} (for local testing)`);
});
