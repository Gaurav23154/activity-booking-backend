const Activity = require('../models/activity');

// @desc    Get all activities
// @route   GET /api/activities
// @access  Public
exports.getActivities = async (req, res) => {
  try {
    // Simple query to get all activities sorted by date (newest first)
    const activities = await Activity.find()
      .sort({ dateTime: 1 }); // Sort by date ascending

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get single activity
// @route   GET /api/activities/:id
// @access  Public
exports.getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    res.status(200).json({
      success: true,
      data: activity
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
    
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Create a new activity (admin feature)
// @route   POST /api/activities
// @access  Private (For admin use, but included for completeness)
exports.createActivity = async (req, res) => {
  try {
    const { title, description, location, dateTime, capacity } = req.body;
    
    const activity = await Activity.create({
      title,
      description,
      location,
      dateTime,
      capacity: capacity || 20 // Default capacity if not provided
    });

    res.status(201).json({
      success: true,
      data: activity
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};