const router = require('express').Router();

const {
  submitEnrolment,
  getAllEnrolments,
  deleteEnrolment,
  updateEnrolmentMeta,
} = require('../controllers/enrolmentController');

router.post('/', submitEnrolment);

router.get('/', getAllEnrolments);

router.delete('/:id', deleteEnrolment);

router.patch('/:id', updateEnrolmentMeta);

module.exports = router;
