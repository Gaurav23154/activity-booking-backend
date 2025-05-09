const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getMe 
} = require('../controllers/authController');
const { 
  registerValidation, 
  loginValidation, 
  validate 
} = require('../middleware/validation');
const { protect } = require('../middleware/auth');

// Register new user
router.post('/register', registerValidation, validate, registerUser);

// Login user
router.post('/login', loginValidation, validate, loginUser);

// Get current logged in user
router.get('/me', protect, getMe);

module.exports = router;