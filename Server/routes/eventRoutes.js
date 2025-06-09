const express = require('express');
const router = express.Router();

const { getAllEvents, createEvent } = require('../controllers/eventController');

// Public route to get all events
router.get('/', getAllEvents);

// Admin route to create a new event (used in Task 2)
router.post('/', createEvent);

module.exports = router;
