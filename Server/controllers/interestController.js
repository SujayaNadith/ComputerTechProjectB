// Server/controllers/interestController.js
const { Types } = require('mongoose');
const Interest = require('../models/Interest');

// Helper to decode base64 (data URL or raw)
function decodeBase64(base64) {
  const dataUrlMatch = /^data:([^;]+);base64,(.*)$/i.exec(base64 || '');
  if (dataUrlMatch) {
    return { mimetype: dataUrlMatch[1], buffer: Buffer.from(dataUrlMatch[2], 'base64') };
  }
  return { mimetype: undefined, buffer: Buffer.from(base64 || '', 'base64') };
}

exports.submitInterest = async (req, res) => {
  try {
    const { title, firstName, lastName, familyName, positions, cv } = req.body || {};

    if (!firstName || !lastName) {
      return res.status(400).json({ error: 'First name and last name are required.' });
    }
    if (!cv || !cv.base64 || !cv.filename) {
      return res.status(400).json({ error: 'CV upload is required.' });
    }

    const { buffer, mimetype: fromDataUrl } = decodeBase64(cv.base64);
    const mimetype = cv.mimetype || fromDataUrl || 'application/octet-stream';

    if (!buffer || !buffer.length) {
      return res.status(400).json({ error: 'Invalid CV file data.' });
    }

    const doc = new Interest({
      title: (title || '').trim(),
      firstName: (firstName || '').trim(),
      lastName: (lastName || '').trim(),
      familyName: (familyName || '').trim() || undefined,
      positions: Array.isArray(positions) ? positions.filter(Boolean) : [],
      cv: {
        filename: cv.filename,
        mimetype,
        size: buffer.length,
        data: buffer,
      },
    });

    await doc.save();
    return res.status(201).json({ message: 'Interest submitted successfully', id: doc.id });
  } catch (err) {
    console.error('BACKEND ERROR (submitInterest):', err);
    return res.status(500).json({ error: 'Failed to submit interest' });
  }
};

exports.getAllInterests = async (_req, res) => {
  try {
    const docs = await Interest.find({}, { 'cv.data': 0 }).sort({ createdAt: -1 }).lean();
    return res.status(200).json(docs || []);
  } catch (err) {
    console.error('BACKEND ERROR (getAllInterests):', err);
    return res.status(500).json({ error: 'Failed to fetch interests' });
  }
};

exports.downloadCv = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid interest id' });
    }
    const doc = await Interest.findById(id).lean(false);
    if (!doc || !doc.cv || !doc.cv.data) {
      return res.status(404).json({ error: 'CV not found' });
    }

    res.setHeader('Content-Type', doc.cv.mimetype || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${doc.cv.filename || 'cv'}"`);
    return res.status(200).send(doc.cv.data);
  } catch (err) {
    console.error('BACKEND ERROR (downloadCv):', err);
    return res.status(500).json({ error: 'Failed to download CV' });
  }
};

exports.deleteInterest = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid interest id' });
    }
    const deleted = await Interest.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Interest not found' });
    return res.status(200).json({ message: 'Interest deleted successfully' });
  } catch (err) {
    console.error('BACKEND ERROR (deleteInterest):', err);
    return res.status(500).json({ error: 'Failed to delete interest' });
  }
};

exports.updateInterestMeta = async (req, res) => {
  try {
    const update = {};
    if (typeof req.body.adminStatus === 'string') update.adminStatus = req.body.adminStatus;
    if (typeof req.body.adminNote === 'string') update.adminNote = req.body.adminNote;

    const doc = await Interest.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true, projection: { 'cv.data': 0 } }
    );
    if (!doc) return res.status(404).json({ error: 'Interest not found' });
    return res.status(200).json(doc);
  } catch (err) {
    console.error('BACKEND ERROR (updateInterestMeta):', err);
    return res.status(500).json({ error: 'Failed to update interest' });
  }
};

