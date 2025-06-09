const Contact = require("../models/Contact");

exports.submitContact = async (req, res) => {
  try {
    console.log("📬 Received contact form data:", req.body);
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: "Contact message submitted successfully" });
  } catch (err) {
    console.error("🔥 BACKEND ERROR:", err);
    res.status(500).json({ error: "Failed to submit contact message" });
  }
};
