const express = require('express');
const router = express.Router();
const {
  getActivities,
  getActivity,
  createActivity
} = require('../controllers/activityController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getActivities);
router.get('/:id', getActivity);

// Protected routes (Admin functionality - for completeness)
router.post('/', protect, createActivity);

module.exports = router;