const express = require('express');
const router = express.Router();
const Enrolment = require('../models/Enrolment');
const { submitEnrolment } = require('../controllers/enrolmentController');

// 👉 POST route (already exists)
router.post('/', submitEnrolment);

// 👉 NEW: GET route for admin
router.get('/', async (req, res) => {
    try {
        const enrolments = await Enrolment.find().sort({ date: -1 });
        res.json(enrolments);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch enrolments' });
    }
});

module.exports = router;
