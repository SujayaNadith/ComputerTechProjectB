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
    },
    // Admin workflow fields
    adminStatus: {
        type: String,
        enum: ['new', 'in_progress', 'resolved'],
        default: 'new',
    },
    adminNote: {
        type: String,
        default: '',
        trim: true,
    }
});

// Export the model so it can be used in other files
module.exports = mongoose.model('Enrolment', enrolmentSchema);
