import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// In production, we'd use a service account key file.
// For now, if no config is present, we log a warning but don't crash, 
// so the app can still be tested in a mocked state.

try {
  // Option 1: Load from a downloaded service account key JSON file
  // Option 2: Use environment variables
  if (process.env.FIREBASE_PROJECT_ID) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
      })
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } else {
    console.warn('⚠️ FIREBASE_PROJECT_ID missing. Firebase Admin SDK not initialized.');
  }
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
}

export const db = admin.apps.length ? admin.firestore() : null;
export const auth = admin.apps.length ? admin.auth() : null;
export default admin;
