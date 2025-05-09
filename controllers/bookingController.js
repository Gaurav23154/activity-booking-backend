const Booking = require('../models/Booking');
const Activity = require('../models/activity');

// @desc    Book an activity
// @route   POST /api/bookings
// @access  Private
exports.bookActivity = async (req, res) => {
  try {
    const { activityId } = req.body;
    
    // Check if activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    
    // Check if user already booked this activity
    const existingBooking = await Booking.findOne({
      user: req.user.id,
      activity: activityId
    });
    
    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'You have already booked this activity'
      });
    }
    
    // Create booking
    const booking = await Booking.create({
      activity: activityId,
      user: req.user.id
    });
    
    await booking.populate('activity');
    
    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (err) {
    console.error(err.message);
    
    // Handle invalid ObjectId
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    
    // Handle duplicate booking (this should be caught by the check above, but just in case)
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already booked this activity'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get logged-in user's bookings
// @route   GET /api/bookings/my
// @access  Private
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('activity')
      .sort({ bookedAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Cancel a booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Make sure booking belongs to user
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }
    
    booking.status = 'cancelled';
    await booking.save();
    await booking.populate('activity');
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    console.error(err.message);
    
    // Handle invalid ObjectId
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};