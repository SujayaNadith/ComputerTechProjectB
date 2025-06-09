const Event = require('../models/Events.js');

// GET /api/events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events.' });
  }
};

// POST /api/events (admin use — to be wired next)
const createEvent = async (req, res) => {
  try {
    const { title, date, description } = req.body;

    if (!title || !date || !description) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newEvent = new Event({ title, date, description });
    await newEvent.save();

    res.status(201).json({ message: 'Event created successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event.' });
  }
};

module.exports = {
  getAllEvents,
  createEvent
};
