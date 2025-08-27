const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ success: false, message: 'Password is required.' });
  }

  // Compare against env var (set in Render)
  if (password === process.env.ADMIN_PASSWORD) {
    return res.status(200).json({ success: true });
  }

  // Don’t log attempted passwords
  console.warn('❌ Failed admin login attempt');
  return res.status(401).json({ success: false, message: 'Incorrect password.' });
});

module.exports = router;
