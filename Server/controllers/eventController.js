// Import the Event model to interact with the events collection in the database
const Event = require('../models/Events.js');

//Controller to fetch all events from the database.

const getAllEvents = async (req, res) => {
  try {
    // Fetch all events, sorted by date (soonest first)
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    // Respond with server error if fetching fails
    res.status(500).json({ error: 'Failed to fetch events.' });
  }
};

// Controller to create a new event.

const createEvent = async (req, res) => {
  try {
    const { title, date, description } = req.body;

    // Basic validation to ensure all required fields are present
    if (!title || !date || !description) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new Event document using the provided data
    const newEvent = new Event({ title, date, description });
    await newEvent.save();

    // Respond with success message upon successful creation
    res.status(201).json({ message: 'Event created successfully.' });
  } catch (err) {
    // Respond with server error if creation fails
    res.status(500).json({ error: 'Failed to create event.' });
  }
};

// Export the controller functions for use in routes
module.exports = {
  getAllEvents,
  createEvent
};
