const router = require('express').Router();
// Use the correct model file name (Events.js exports model 'Event')
const Event = require('../models/Events');

// GET /events → all events sorted by date ascending
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }).lean();
    res.status(200).json(events || []);
  } catch (err) {
    console.error('❌ Error fetching events:', err.message);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

module.exports = router;
