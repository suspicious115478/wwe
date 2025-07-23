// app.js
const express = require('express');
const bodyParser = require('body-parser');
app.use('/api/data', dataRoutes);// Keep this require for now, but we'll comment out its use

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(bodyParser.json());

// Temporarily comment out the dataRoutes middleware
// app.use('/api/data', dataRoutes);

// Add a super simple, absolutely unambiguous test route
app.get('/', (req, res) => {
  res.send('Firebase Realtime Database API is running!');
});

app.get('/health', (req, res) => { // Renamed to 'health' for a fresh start, just in case
  res.send('Health check OK!');
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
  console.log(`Open in browser: http://localhost:${PORT} (for local testing)`);
});
