const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const requiredFields = [
  'code',
  'name',
  'length',
  'start',
  'resort',
  'perPerson',
  'image',
  'description'
];

const missingFields = (body) => requiredFields.filter((field) => {
  return body[field] === undefined || body[field] === null || String(body[field]).trim() === '';
});

const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({});
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({
      message: 'Unable to retrieve trips.',
      error: err.message
    });
  }
};

const tripsFindByCode = async (req, res) => {
  try {
    const trips = await Trip.find({ code: req.params.tripCode });

    if (trips.length === 0) {
      return res.status(404).json({
        message: `No trip found with code ${req.params.tripCode}.`
      });
    }

    return res.status(200).json(trips[0]);
  } catch (err) {
    return res.status(500).json({
      message: 'Unable to retrieve the trip.',
      error: err.message
    });
  }
};

const tripsAddTrip = async (req, res) => {
  const missing = missingFields(req.body);
  if (missing.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missing.join(', ')}.`
    });
  }

  try {
    const existingTrip = await Trip.findOne({ code: req.body.code });
    if (existingTrip) {
      return res.status(409).json({
        message: `A trip with code ${req.body.code} already exists.`
      });
    }

    const trip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    return res.status(201).json(trip);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({
      message: 'Unable to create the trip.',
      error: err.message
    });
  }
};

const tripsUpdateTrip = async (req, res) => {
  const missing = missingFields(req.body);
  if (missing.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missing.join(', ')}.`
    });
  }

  try {
    const trip = await Trip.findOne({ code: req.params.tripCode });
    if (!trip) {
      return res.status(404).json({
        message: `No trip found with code ${req.params.tripCode}.`
      });
    }

    if (req.body.code !== req.params.tripCode) {
      const duplicate = await Trip.findOne({ code: req.body.code });
      if (duplicate) {
        return res.status(409).json({
          message: `A trip with code ${req.body.code} already exists.`
        });
      }
    }

    requiredFields.forEach((field) => {
      trip[field] = req.body[field];
    });

    const updatedTrip = await trip.save();
    return res.status(200).json(updatedTrip);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({
      message: 'Unable to update the trip.',
      error: err.message
    });
  }
};

const tripsDeleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ code: req.params.tripCode });
    if (!trip) {
      return res.status(404).json({
        message: `No trip found with code ${req.params.tripCode}.`
      });
    }

    return res.status(200).json({
      message: `Trip ${req.params.tripCode} deleted.`,
      trip: trip
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Unable to delete the trip.',
      error: err.message
    });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
