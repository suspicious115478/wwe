// dataRoutes.js
const express = require('express');
const router = express.Router();
const db = require('./firebaseConfig'); // Correct path for flat structure

// IMPORTANT: Order matters. More specific routes first, then more general ones.

// Route for specific users (e.g., /api/data/users/someUserId)
// This will correctly extract the userId from the URL parameter.
router.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const path = `users/${userId}`; // Construct Firebase path

  console.log(`Attempting to fetch data from Firebase path: /${path}`);
  try {
    const ref = db.ref(path);
    const snapshot = await ref.once('value');

    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: `User with ID '${userId}' not found.` });
    }
  } catch (error) {
    console.error(`Error fetching data for user '${userId}':`, error);
    res.status(500).json({ error: 'Failed to retrieve user data', details: error.message });
  }
});

// Catch-all route for any other paths (e.g., /api/data, /api/data/products, /api/data/anything/else)
// This must be the LAST route defined in this router.
router.get('/*', async (req, res) => {
  // req.params[0] contains the part of the URL matched by '/*' after the /api/data prefix
  const path = req.params[0] || '/'; // Default to root (/) if no specific path provided

  console.log(`Attempting to fetch data from Firebase path: /${path}`); // Log the actual Firebase path

  try {
    const ref = db.ref(path);
    const snapshot = await ref.once('value');

    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      // If snapshot doesn't exist, it means no data at that path
      res.status(404).json({ message: `No data found at path: /${path}` });
    }
  } catch (error) {
    console.error(`Error fetching data from path '/${path}':`, error);
    res.status(500).json({ error: 'Failed to retrieve data', details: error.message });
  }
});

module.exports = router;
