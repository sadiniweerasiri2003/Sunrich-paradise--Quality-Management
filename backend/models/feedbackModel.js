// feedbackSchema
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: "234", 
    required: true
},
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => /\S+@\S+\.\S+/.test(value), // Basic email validation
      message: 'Please enter a valid email address.',
    },
  },
  rating: {
    type: String,
    required: true,
  },
  reviewTitle: {
    type: String,
    required: true,
  },
  images: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
