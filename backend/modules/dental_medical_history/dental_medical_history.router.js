const express = require('express');
const router = express.Router();
const dentalMedicalHistoryController = require('./dental_medical_history.controller');

router.get('/', dentalMedicalHistoryController.getDentalMedicalHistory);

module.exports = router;