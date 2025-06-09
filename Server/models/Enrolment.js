const mongoose = require('mongoose');

const enrolmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enrolment', enrolmentSchema);
