// app.js
const express = require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./dataRoutes'); // <-- CORRECTED PATH: Removed './routes/'

// The rest of your app.js code remains the same
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(bodyParser.json());
app.use('/api/data', dataRoutes);

app.get('/', (req, res) => {
  res.send('Firebase Realtime Database API is running!');
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
  console.log(`Open in browser: http://localhost:${PORT} (for local testing)`);
});
