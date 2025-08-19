// Import mongoose to work with MongoDB
const mongoose = require('mongoose');

// Create schema for enrolment form
const enrolmentSchema = new mongoose.Schema({
    name: String,        
    email: String,       
    message: String,     
    date: {         
        type: Date,
        default: Date.now
    }
});

// Export the model so it can be used in other files
module.exports = mongoose.model('Enrolment', enrolmentSchema);
