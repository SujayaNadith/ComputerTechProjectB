const Enrolment = require("../models/Enrolment");


exports.submitEnrolment = async (req, res) => {
    try {
      console.log("📦 Received form data:", req.body);
      const newEnrolment = new Enrolment(req.body);
      await newEnrolment.save();
      res.status(201).json({ message: 'Enrolment submitted successfully' });
    } catch (err) {
      console.error("🔥 BACKEND ERROR:", err);
      res.status(500).json({ error: 'Failed to submit enrolment' });
    }
  };

exports.deleteEnrolment = async (req, res) => {
  try {
    const deleted = await Enrolment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Enrolment not found" });
    }
    res.status(200).json({ message: "Enrolment deleted successfully" });
  } catch (err) {
    console.error("🔥 BACKEND ERROR (deleteEnrolment):", err);
    res.status(500).json({ error: "Failed to delete enrolment" });
  }
};
  