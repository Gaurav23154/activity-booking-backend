const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed'
  }
});

// Prevent user from booking the same activity twice
BookingSchema.index({ activity: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Booking', BookingSchema);