// dataRoutes.js
const express = require('express');
const router = express.Router();
const db = require('./firebaseConfig'); // Correct path for flat structure

// This route should come FIRST if you want specific paths to be handled explicitly
router.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const path = `users/${userId}`; // Correct Firebase path string

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

// This catch-all route should come LAST.
// It will handle requests like /api/data, /api/data/products, /api/data/anything/else
// It will also capture /api/data/users/userId IF the above /users/:userId route wasn't matched first.
// The '/*' syntax is generally preferred for this kind of "everything else" path capture.
router.get('/*', async (req, res) => { // Use '/*' to capture anything else
  // The captured path segment will be in req.params[0]
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
