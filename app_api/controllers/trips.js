const mongoose = require('mongoose');
const Trip = mongoose.model('trips');
const { buildTripPayload } = require('../middleware/trip-validation');
const { sendClientError, sendInternalError } = require('../utils/api-errors');

const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({});
    return res.status(200).json(trips);
  } catch (err) {
    return sendInternalError(res, 'Unable to retrieve trips.', err, 'Listing trips failed');
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
    return sendInternalError(res, 'Unable to retrieve the trip.', err, 'Finding a trip failed');
  }
};

const tripsAddTrip = async (req, res) => {
  try {
    const existingTrip = await Trip.findOne({ code: req.body.code });
    if (existingTrip) {
      return res.status(409).json({
        message: `A trip with code ${req.body.code} already exists.`
      });
    }

    const trip = await Trip.create(buildTripPayload(req.body));

    return res.status(201).json(trip);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return sendClientError(res, 400, 'Invalid trip data.', err, 'Trip creation validation failed');
    }

    return sendInternalError(res, 'Unable to create the trip.', err, 'Creating a trip failed');
  }
};

const tripsUpdateTrip = async (req, res) => {
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

    Object.assign(trip, buildTripPayload(req.body));

    const updatedTrip = await trip.save();
    return res.status(200).json(updatedTrip);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return sendClientError(res, 400, 'Invalid trip data.', err, 'Trip update validation failed');
    }

    return sendInternalError(res, 'Unable to update the trip.', err, 'Updating a trip failed');
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
    return sendInternalError(res, 'Unable to delete the trip.', err, 'Deleting a trip failed');
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
