const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authenticationController = require('../controllers/authentication');
const { requireAuth } = require('../middleware/authentication');
const { validateTripBody } = require('../middleware/trip-validation');

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindByCode);
router.post('/trips', requireAuth, validateTripBody, tripsController.tripsAddTrip);
router.put('/trips/:tripCode', requireAuth, validateTripBody, tripsController.tripsUpdateTrip);
router.delete('/trips/:tripCode', requireAuth, tripsController.tripsDeleteTrip);

module.exports = router;
