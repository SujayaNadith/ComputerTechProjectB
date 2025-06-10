const express = require('express');
const router = express.Router();
require('dotenv').config();

router.post('/login', (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ success: false, message: 'Password is required.' });
  }

  if (password === process.env.ADMIN_PASSWORD) {
    return res.status(200).json({ success: true });
  } else {
    console.warn(`❌ Failed login attempt with password: ${password}`);
    return res.status(401).json({ success: false, message: 'Incorrect password.' });
  }
});

module.exports = router;
