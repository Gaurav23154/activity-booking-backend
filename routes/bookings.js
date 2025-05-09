const express = require('express');
const router = express.Router();
const {
  bookActivity,
  getMyBookings,
  cancelBooking
} = require('../controllers/bookingController');
const { bookingValidation, validate } = require('../middleware/validation');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// Book an activity
router.post('/', bookingValidation, validate, bookActivity);

// Get my bookings
router.get('/my', getMyBookings);

// Cancel booking
router.put('/:id/cancel', cancelBooking);

module.exports = router;