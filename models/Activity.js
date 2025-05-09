const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an activity title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  location: {
    type: String,
    required: [true, 'Please provide a location']
  },
  dateTime: {
    type: Date,
    required: [true, 'Please provide date and time for the activity']
  },
  capacity: {
    type: Number,
    default: 20
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Activity', ActivitySchema);