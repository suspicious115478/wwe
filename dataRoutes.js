// dataRoutes.js
const express = require('express');
const router = express.Router();
const db = require('./firebaseConfig');

// GET data from a specific path in Firebase Realtime Database
// Change this line:
router.get('/*', async (req, res) => { // Use '/*' to capture anything after /api/data/
  // The captured path will be in req.params[0]
  const path = req.params[0] || '/'; // Default to root if no path is provided

  try {
    const ref = db.ref(path);
    const snapshot = await ref.once('value');

    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: `No data found at path: ${path}` });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to retrieve data', details: error.message });
  }
});

// Your existing '/users/:userId' route is fine and should come AFTER the wildcard route.
// However, if you use '/*', it will also capture '/users/...'
// This requires a careful order of routes or a different approach.

// Let's refine the routes for clarity:

// This route should come FIRST if you want specific paths to be handled explicitly
router.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const path = `users/${userId}`;

  try {
    const ref = db.ref(path);
    const snapshot = await ref.once('value');

    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: `User with ID ${userId} not found.` });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to retrieve user data', details: error.message });
  }
});

// This catch-all route should come LAST
router.get('*', async (req, res) => { // Use '*' to capture anything else
  // The captured path will be in req.params[0]
  const path = req.params[0] ? req.params[0] : '/'; // Default to root if no path is provided
  console.log(`Attempting to fetch data from Firebase path: ${path}`); // Added for debugging

  try {
    const ref = db.ref(path);
    const snapshot = await ref.once('value');

    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: `No data found at path: ${path}` });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to retrieve data', details: error.message });
  }
});


module.exports = router;
