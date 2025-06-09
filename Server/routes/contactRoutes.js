const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { submitContact } = require("../controllers/contactController");

// 👉 POST route (already exists)
router.post("/", submitContact);

// 👉 NEW: GET route for admin
router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ date: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
});

module.exports = router;
