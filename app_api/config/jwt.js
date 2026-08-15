const jwt = require('jsonwebtoken');

const developmentSecret = 'travlr-development-only-secret-change-before-deployment';

const getJwtSecret = () => process.env.JWT_SECRET || developmentSecret;

const signToken = (payload) => jwt.sign(payload, getJwtSecret(), {
  expiresIn: '7d'
});

const verifyToken = (token) => jwt.verify(token, getJwtSecret());

module.exports = {
  signToken,
  verifyToken
};
