const { verifyToken } = require('../config/jwt');

const requireAuth = (req, res, next) => {
  const authorization = req.get('Authorization') || '';
  const match = authorization.match(/^Bearer\s+(.+)$/i);

  if (!match) {
    return res.status(401).json({ message: 'A valid Bearer token is required.' });
  }

  try {
    req.auth = verifyToken(match[1]);
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'The authentication token is invalid or expired.' });
  }
};

module.exports = {
  requireAuth
};
