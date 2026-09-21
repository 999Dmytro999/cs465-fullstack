const DEVELOPMENT_CLIENT_ORIGIN = 'http://localhost:4200';

const getClientOrigins = (environment = process.env) => {
  const configuredOrigins = String(environment.CLIENT_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (configuredOrigins.length > 0) {
    return configuredOrigins;
  }

  if (environment.NODE_ENV === 'production') {
    throw new Error('CLIENT_ORIGIN is required when NODE_ENV=production.');
  }

  return [DEVELOPMENT_CLIENT_ORIGIN];
};

module.exports = {
  getClientOrigins
};
