const test = require('node:test');
const assert = require('node:assert/strict');
const { sendInternalError } = require('../app_api/utils/api-errors');
const { createResponse } = require('../test-support/response');

test('internal API errors are logged without exposing raw details to clients', (context) => {
  const response = createResponse();
  const originalConsoleError = console.error;
  const logged = [];
  console.error = (...values) => logged.push(values);
  context.after(() => { console.error = originalConsoleError; });

  sendInternalError(
    response,
    'Unable to retrieve trips.',
    new Error('mongodb://private-host:27017 failed'),
    'Listing trips failed'
  );

  assert.equal(response.statusCode, 500);
  assert.deepEqual(response.body, { message: 'Unable to retrieve trips.' });
  assert.equal(JSON.stringify(response.body).includes('private-host'), false);
  assert.equal(logged.length, 1);
  assert.equal(String(logged[0][1]).includes('private-host'), true);
});
