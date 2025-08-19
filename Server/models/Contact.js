// Import the mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define the schema for the "Contact" collection
const contactSchema = new mongoose.Schema({
  // Full name of the person submitting the contact form
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: String,
  message: { type: String, required: true }
}, { 
  timestamps: true 
});

// Export the schema as a Mongoose model named "Contact"
module.exports = mongoose.model("Contact", contactSchema);
