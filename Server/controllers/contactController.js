const Contact = require("../models/Contact");

exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const newContact = new Contact({ name, email, phone, subject, message });
    await newContact.save();

    res.status(201).json({ message: "Contact message submitted successfully" });
  } catch (err) {
    console.error("🔥 BACKEND ERROR (submitContact):", err);
    res.status(500).json({ error: "Failed to submit contact message" });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    console.error("🔥 BACKEND ERROR (getAllContacts):", err);
    res.status(500).json({ error: "Failed to fetch contact inquiries" });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    console.error("🔥 BACKEND ERROR (deleteContact):", err);
    res.status(500).json({ error: "Failed to delete contact" });
  }
};

