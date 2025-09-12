const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
// Use the correct model file name (Events.js exports model 'Event')
const Event = require('../models/Events');

// Storage config for event images
const uploadsDir = path.join(__dirname, '..', 'uploads', 'events');
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_');
    const stamp = Date.now();
    const ext = path.extname(safe) || '.jpg';
    cb(null, `${stamp}-${Math.random().toString(36).slice(2,8)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024, files: 6 }, // 8MB each, up to 6 images
  fileFilter: (_req, file, cb) => {
    const ok = /image\/(jpeg|jpg|png|webp)/i.test(file.mimetype);
    cb(ok ? null : new Error('Only JPG, PNG, WEBP images allowed'), ok);
  },
});

// GET /events → all events sorted by date ascending
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }).lean();
    res.status(200).json(events || []);
  } catch (err) {
    console.error('❌ Error fetching events:', err.message);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// POST /events → create event with optional images
router.post('/', upload.array('images', 6), async (req, res) => {
  try {
    const { title, date, description } = req.body;
    if (!title || !date || !description) {
      return res.status(400).json({ error: 'title, date, and description are required' });
    }

    const base = `${req.protocol}://${req.get('host')}`;
    // Express serves static at /uploads
    const imageUrls = (req.files || []).map((f) => `${base}/uploads/events/${path.basename(f.path)}`);

    const event = await Event.create({ title, date, description, images: imageUrls });
    res.status(201).json(event);
  } catch (err) {
    console.error('❌ Error creating event:', err.message);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// GET /events/:id → single event
router.get('/:id', async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id).lean();
    if (!ev) return res.status(404).json({ error: 'Event not found' });
    res.json(ev);
  } catch (err) {
    console.error('❌ Error fetching event:', err.message);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// PATCH /events/:id → update fields and images
// Accepts multipart. Optional field 'existingImages' (JSON array of URLs to retain).
router.patch('/:id', upload.array('images', 6), async (req, res) => {
  try {
    const { title, date, description } = req.body;

    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ error: 'Event not found' });

    if (title !== undefined) ev.title = title;
    if (date !== undefined) ev.date = date;
    if (description !== undefined) ev.description = description;

    // Build new images array: retained ones + newly uploaded
    let retained = [];
    if (req.body.existingImages) {
      try {
        const parsed = JSON.parse(req.body.existingImages);
        if (Array.isArray(parsed)) retained = parsed.filter(Boolean);
      } catch {}
    } else {
      // If not provided, default to keeping current ones
      retained = Array.isArray(ev.images) ? ev.images : [];
    }

    const base = `${req.protocol}://${req.get('host')}`;
    const uploaded = (req.files || []).map((f) => `${base}/uploads/events/${path.basename(f.path)}`);

    // If retained excludes some old images, delete those files from disk
    const toDelete = (ev.images || []).filter((u) => !retained.includes(u));
    toDelete.forEach((url) => {
      const fname = url.split('/uploads/events/')[1];
      if (!fname) return;
      const p = path.join(uploadsDir, fname);
      fs.unlink(p, () => {});
    });

    ev.images = [...retained, ...uploaded];
    await ev.save();
    res.json(ev);
  } catch (err) {
    console.error('❌ Error updating event:', err.message);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// DELETE /events/:id → delete event and associated image files
router.delete('/:id', async (req, res) => {
  try {
    const ev = await Event.findByIdAndDelete(req.params.id);
    if (!ev) return res.status(404).json({ error: 'Event not found' });
    (ev.images || []).forEach((url) => {
      const fname = url.split('/uploads/events/')[1];
      if (!fname) return;
      const p = path.join(uploadsDir, fname);
      fs.unlink(p, () => {});
    });
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Error deleting event:', err.message);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

module.exports = router;
