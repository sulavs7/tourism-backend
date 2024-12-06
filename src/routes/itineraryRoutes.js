const express = require('express');
const { createItinerary, getItineraries, getItineraryById } = require('../controllers/itineraryController');
const { auth, checkRole } = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, checkRole(['local']), createItinerary);
router.get('/', getItineraries);
router.get('/:id', getItineraryById);

module.exports = router;