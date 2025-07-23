// dataRoutes.js
const express = require('express');
const router = express.Router();
const db = require('./firebaseConfig'); // <-- CORRECTED PATH: Removed '../config/'

// GET data from a specific path in Firebase Realtime Database
router.get('/:path?', async (req, res) => {
  const path = req.params.path || '/';

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

// Example of a specific endpoint for 'users'
router.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const path = `users/${userId}`;

  try {
    const ref = db.ref(path);
    const snapshot = await ref.once('value');

    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(400).json({ message: `User with ID ${userId} not found.` });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to retrieve user data', details: error.message });
  }
});

module.exports = router;
