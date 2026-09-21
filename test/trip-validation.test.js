const test = require('node:test');
const assert = require('node:assert/strict');
const { validateTripBody } = require('../app_api/middleware/trip-validation');
const { createResponse } = require('../test-support/response');

const completeTrip = {
  code: 'TEST001',
  name: 'Test Trip',
  length: '3 nights / 4 days',
  start: '2026-10-01',
  resort: 'Test Resort',
  perPerson: '$500.00',
  image: 'reef1.jpg',
  description: 'A test trip.'
};

test('trip validation reports every missing required field', () => {
  const response = createResponse();
  let nextCalled = false;

  validateTripBody(
    { body: { ...completeTrip, code: ' ', image: null } },
    response,
    () => { nextCalled = true; }
  );

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, { message: 'Missing required fields: code, image.' });
  assert.equal(nextCalled, false);
});

test('trip validation passes a complete trip to the controller', () => {
  const response = createResponse();
  let nextCalled = false;

  validateTripBody({ body: completeTrip }, response, () => { nextCalled = true; });

  assert.equal(nextCalled, true);
  assert.equal(response.statusCode, 200);
  assert.equal(response.body, undefined);
});
