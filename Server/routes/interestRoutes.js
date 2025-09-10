// Server/routes/interestRoutes.js
const router = require('express').Router();

const {
  submitInterest,
  getAllInterests,
  downloadCv,
  deleteInterest,
  updateInterestMeta,
} = require('../controllers/interestController');

// POST /api/interests - submit a new interest
router.post('/', submitInterest);

// GET /api/interests - list all interests (without CV buffer)
router.get('/', getAllInterests);

// GET /api/interests/:id/cv - download CV
router.get('/:id/cv', downloadCv);

// DELETE /api/interests/:id - delete an interest
router.delete('/:id', deleteInterest);

// PATCH /api/interests/:id - update admin metadata
router.patch('/:id', updateInterestMeta);

module.exports = router;

