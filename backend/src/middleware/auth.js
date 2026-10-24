const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'agrifusion_academic_jwt_secret_key_2026';

// Required auth middleware
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required. Missing token.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // Check if demo token
    if (token === 'demo_jwt_token_academic_evaluator') {
      req.user = {
        id: 'usr_eval_academic_2026',
        name: 'Academic Review Committee',
        email: 'evaluator@university.edu',
        role: 'evaluator'
      };
      return next();
    }
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

// Optional auth middleware (sets req.user if token valid, but allows guest access)
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch {
    if (token === 'demo_jwt_token_academic_evaluator') {
      req.user = {
        id: 'usr_eval_academic_2026',
        name: 'Academic Review Committee',
        email: 'evaluator@university.edu',
        role: 'evaluator'
      };
    } else {
      req.user = null;
    }
  }
  next();
};

module.exports = {
  requireAuth,
  optionalAuth,
  JWT_SECRET
};
