const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const MINIMUM_PRODUCTION_SECRET_LENGTH = 32;

const resolveJwtSecret = (
  environment = process.env,
  generateSecret = () => crypto.randomBytes(64).toString('hex')
) => {
  const configuredSecret = String(environment.JWT_SECRET || '').trim();

  if (configuredSecret) {
    if (
      environment.NODE_ENV === 'production' &&
      configuredSecret.length < MINIMUM_PRODUCTION_SECRET_LENGTH
    ) {
      throw new Error('JWT_SECRET must contain at least 32 characters in production.');
    }

    return configuredSecret;
  }

  if (environment.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET is required when NODE_ENV=production.');
  }

  return generateSecret();
};

const jwtSecret = resolveJwtSecret();

if (!process.env.JWT_SECRET && process.env.NODE_ENV !== 'test') {
  console.warn('JWT_SECRET is not set. Using a temporary secret for this development process.');
}

const signToken = (payload) => jwt.sign(payload, jwtSecret, {
  expiresIn: '7d'
});

const verifyToken = (token) => jwt.verify(token, jwtSecret);

module.exports = {
  resolveJwtSecret,
  signToken,
  verifyToken
};
