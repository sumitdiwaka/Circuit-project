const mongoose = require('mongoose');

const circuitSchema = new mongoose.Schema({
  // This creates a connection to the 'User' model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', 
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  components: {
    type: [String], // Defines an array of strings
    default: [],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL'],
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Circuit', circuitSchema);