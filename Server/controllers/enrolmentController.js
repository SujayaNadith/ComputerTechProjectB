// Import the Enrolment model to interact with the enrolment collection in the database
const Enrolment = require("../models/Enrolment");

//Controller to handle submission of enrolment form data.

exports.submitEnrolment = async (req, res) => {
    try {
      // Log the incoming enrolment data for traceability
      console.log("📦 Received form data:", req.body);

      // Create a new Enrolment document using the provided data
      const newEnrolment = new Enrolment(req.body);
      await newEnrolment.save();

      // Respond with success message upon successful save
      res.status(201).json({ message: 'Enrolment submitted successfully' });
    } catch (err) {
      // Log error for debugging and respond with server error
      console.error("🔥 BACKEND ERROR:", err);
      res.status(500).json({ error: 'Failed to submit enrolment' });
    }
  };

// Controller to fetch all enrolment submissions (newest first)
exports.getAllEnrolments = async (_req, res) => {
  try {
    const enrolments = await Enrolment.find().sort({ date: -1 });
    res.status(200).json(enrolments);
  } catch (err) {
    console.error("🔥 BACKEND ERROR (getAllEnrolments):", err);
    res.status(500).json({ error: "Failed to fetch enrolments" });
  }
};

//Controller to delete a specific enrolment by its ID.

exports.deleteEnrolment = async (req, res) => {
  try {
    const { id } = req.params;
    const { Types } = require('mongoose');
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid enrolment id' });
    }
    const deleted = await Enrolment.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Enrolment not found' });
    }
    return res.status(200).json({ message: 'Enrolment deleted successfully' });
  } catch (err) {
    console.error('🔥 BACKEND ERROR (deleteEnrolment):', err);
    return res.status(500).json({ error: 'Failed to delete enrolment' });
  }
};

// Update admin status/note for an enrolment
exports.updateEnrolmentMeta = async (req, res) => {
  try {
    const update = {};
    if (typeof req.body.adminStatus === 'string') update.adminStatus = req.body.adminStatus;
    if (typeof req.body.adminNote === 'string') update.adminNote = req.body.adminNote;

    const doc = await Enrolment.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ error: 'Enrolment not found' });
    res.status(200).json(doc);
  } catch (err) {
    console.error('🔥 BACKEND ERROR (updateEnrolmentMeta):', err);
    res.status(500).json({ error: 'Failed to update enrolment' });
  }
};
