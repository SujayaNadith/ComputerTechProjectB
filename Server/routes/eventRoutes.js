const router = require('express').Router();
const Event = require('../models/Event');

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
