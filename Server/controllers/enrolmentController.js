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
    // Attempt to find and delete the enrolment by its ID
    const deleted = await Enrolment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      // If no enrolment found with the given ID, respond with 404
      return res.status(404).json({ error: "Enrolment not found" });
    }
    // Respond with success message upon successful deletion
    res.status(200).json({ message: "Enrolment deleted successfully" });
  } catch (err) {
    // Log error and respond with server error
    console.error("🔥 BACKEND ERROR (deleteEnrolment):", err);
    res.status(500).json({ error: "Failed to delete enrolment" });
  }
};
