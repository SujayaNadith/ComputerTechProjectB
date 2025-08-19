const express = require('express');
const router = express.Router();
const {
  submitEnrolment,
  getAllEnrolments,
  deleteEnrolment
} = require('../controllers/enrolmentController');

router.post('/', submitEnrolment);

router.get('/', getAllEnrolments);

router.delete('/:id', deleteEnrolment);

module.exports = router;
