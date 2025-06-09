const Enrolment = require("../models/Enrolment");


exports.submitEnrolment = async (req, res) => {
    try {
      console.log("📦 Received form data:", req.body);  // New
      const newEnrolment = new Enrolment(req.body);
      await newEnrolment.save();
      res.status(201).json({ message: 'Enrolment submitted successfully' });
    } catch (err) {
      console.error("🔥 BACKEND ERROR:", err);  // New
      res.status(500).json({ error: 'Failed to submit enrolment' });
    }
  };
  