const express = require('express');
const router = express.Router();
const systemicMedicalHistoryController = require('./systemic_medical_history.controller');

router.get('/', systemicMedicalHistoryController.getSystemicMedicalHistory);

module.exports = router;