// Import the Contact model to interact with the contact inquiries collection in the database
const Contact = require("../models/Contact");

exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Basic validation to ensure required fields are present
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    // Create a new Contact document using the provided data
    const newContact = new Contact({ name, email, phone, subject, message });
    await newContact.save();

    // Respond with success message upon successful save
    res.status(201).json({ message: "Contact message submitted successfully" });
  } catch (err) {
    // Log error for debugging and respond with server error
    console.error("🔥 BACKEND ERROR (submitContact):", err);
    res.status(500).json({ error: "Failed to submit contact message" });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    // Fetch all contacts, sorted by newest first
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    // Log error and respond with server error
    console.error("🔥 BACKEND ERROR (getAllContacts):", err);
    res.status(500).json({ error: "Failed to fetch contact inquiries" });
  }
};

//Controller to delete a specific contact inquiry by its ID.
exports.deleteContact = async (req, res) => {
  try {
    // Attempt to find and delete the contact by its ID
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      // If no contact found with the given ID, respond with 404
      return res.status(404).json({ error: "Contact not found" });
    }
    // Respond with success message upon successful deletion
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    // Log error and respond with server error
    console.error("🔥 BACKEND ERROR (deleteContact):", err);
    res.status(500).json({ error: "Failed to delete contact" });
  }
};

// Update admin status/note for a contact
exports.updateContactMeta = async (req, res) => {
  try {
    const update = {};
    if (typeof req.body.adminStatus === 'string') update.adminStatus = req.body.adminStatus;
    if (typeof req.body.adminNote === 'string') update.adminNote = req.body.adminNote;

    const doc = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json(doc);
  } catch (err) {
    console.error('🔥 BACKEND ERROR (updateContactMeta):', err);
    res.status(500).json({ error: 'Failed to update contact' });
  }
};
