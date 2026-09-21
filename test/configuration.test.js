process.env.NODE_ENV = 'test';

const test = require('node:test');
const assert = require('node:assert/strict');
const { getClientOrigins } = require('../app_api/config/environment');
const { resolveJwtSecret } = require('../app_api/config/jwt');

test('production requires a JWT secret', () => {
  assert.throws(
    () => resolveJwtSecret({ NODE_ENV: 'production' }),
    /JWT_SECRET is required/
  );
});

test('production rejects short JWT secrets', () => {
  assert.throws(
    () => resolveJwtSecret({ NODE_ENV: 'production', JWT_SECRET: 'too-short' }),
    /at least 32 characters/
  );
});

test('development creates a non-predictable process secret when none is configured', () => {
  const secret = resolveJwtSecret({ NODE_ENV: 'development' }, () => 'generated-test-secret');
  assert.equal(secret, 'generated-test-secret');
});

test('production requires an explicit client origin', () => {
  assert.throws(
    () => getClientOrigins({ NODE_ENV: 'production' }),
    /CLIENT_ORIGIN is required/
  );
});

test('configured client origins support a comma-separated allowlist', () => {
  assert.deepEqual(
    getClientOrigins({ CLIENT_ORIGIN: 'https://admin.example.com, https://staff.example.com' }),
    ['https://admin.example.com', 'https://staff.example.com']
  );
});
