import { auth } from '../config/firebase.js';

/**
 * Middleware to verify Firebase ID tokens
 */
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // If Firebase isn't configured, we allow requests in dev mode to pass through as mocked user
    if (!auth && process.env.NODE_ENV !== 'production') {
      req.user = { uid: 'mock-user-123', role: 'student' };
      return next();
    }
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    if (auth) {
      const decodedToken = await auth.verifyIdToken(token);
      req.user = decodedToken;
    } else {
      // Mock for development if Firebase is not initialized
      req.user = { uid: 'mock-user-123', email: 'student@example.com' };
    }
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

/**
 * Middleware to ensure the user has mentor/admin privileges
 */
export const verifyMentor = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized: User not found' });
  }

  // In a real app, you would check a custom claim or a user document in Firestore
  // Example: if (req.user.role === 'mentor' || req.user.role === 'admin')
  
  // For now, we mock it or check custom claims
  if (req.user.role === 'mentor' || req.user.role === 'admin' || req.user.email?.includes('mentor')) {
    next();
  } else {
    // Fallback mock
    if (!auth && process.env.NODE_ENV !== 'production') {
      return next();
    }
    return res.status(403).json({ error: 'Forbidden: Requires mentor role' });
  }
};
