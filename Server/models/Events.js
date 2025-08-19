// Import mongoose to work with MongoDB
const mongoose = require('mongoose');

// Create schema for events
const eventSchema = new mongoose.Schema({
  title: {              // Event title 
    type: String,
    required: true,
  },
  date: {               // Event date 
    type: Date,
    required: true,
  },
  description: {        // Event description/details 
    type: String,
    required: true,
  },
  createdAt: {          // Date when event is created 
    type: Date,
    default: Date.now,
  }
});

// Export the model so it can be used in other files
module.exports = mongoose.model('Event', eventSchema);