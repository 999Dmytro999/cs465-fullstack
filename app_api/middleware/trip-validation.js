const TRIP_FIELDS = Object.freeze([
  'code',
  'name',
  'length',
  'start',
  'resort',
  'perPerson',
  'image',
  'description'
]);

const findMissingTripFields = (body = {}) => TRIP_FIELDS.filter((field) => {
  return body[field] === undefined || body[field] === null || String(body[field]).trim() === '';
});

const buildTripPayload = (body = {}) => TRIP_FIELDS.reduce((payload, field) => {
  payload[field] = body[field];
  return payload;
}, {});

const validateTripBody = (req, res, next) => {
  const missingFields = findMissingTripFields(req.body);

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(', ')}.`
    });
  }

  return next();
};

module.exports = {
  TRIP_FIELDS,
  buildTripPayload,
  findMissingTripFields,
  validateTripBody
};
