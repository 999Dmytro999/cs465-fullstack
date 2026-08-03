const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

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

module.exports = {
  tripsList,
  tripsFindByCode
};
