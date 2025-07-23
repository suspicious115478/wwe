// firebaseConfig.js (now in the root directory)
const admin = require('firebase-admin');

// No need for 'dotenv' if you removed it as suggested for Render
// const functions = require('firebase-functions'); // Only needed for Firebase Functions

if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  console.error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is NOT set!');
  // For local testing, if you still want to use a local file:
  // (But ensure serviceAccountKey.json is in your .gitignore!)
  try {
    const serviceAccount = require('./serviceAccountKey.json'); // Updated path if local file is used
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
    console.log("Firebase Admin SDK initialized using local file.");
  } catch (error) {
    console.error("Failed to load local serviceAccountKey.json or FIREBASE_SERVICE_ACCOUNT_KEY is missing:", error);
    process.exit(1);
  }
} else {
  try {
    const serviceAccountConfig = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountConfig),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
    console.log("Firebase Admin SDK initialized successfully via environment variable.");
  } catch (error) {
    console.error("Error parsing FIREBASE_SERVICE_ACCOUNT_KEY JSON:", error);
    throw new Error("Failed to parse Firebase Service Account Key JSON. Check format.");
  }
}

const db = admin.database();
module.exports = db;
