process.env.NODE_ENV = 'test';

const test = require('node:test');
const assert = require('node:assert/strict');
const { requireAuth } = require('../app_api/middleware/authentication');
const { createResponse } = require('../test-support/response');

test('protected operations reject requests without a Bearer token', () => {
  const response = createResponse();
  let nextCalled = false;
  const request = { get: () => undefined };

  requireAuth(request, response, () => { nextCalled = true; });

  assert.equal(response.statusCode, 401);
  assert.deepEqual(response.body, { message: 'A valid Bearer token is required.' });
  assert.equal(nextCalled, false);
});
