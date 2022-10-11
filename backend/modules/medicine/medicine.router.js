const express = require('express');
const router = express.Router();
const medicineController = require('./medicine.controller');
const needAuthenticated = require('../../middlewares/needAuthenticated');
const isRole = require('../../middlewares/isRole');
const medicineSchema = require('./medicine.validation');
const validateInput = require('../../middlewares/validateInput')

router.get(
    '/', 
    //needAuthenticated, 
    //isRole, 
    medicineController.getMedicine
);

router.post(
    '/', 
    //needAuthenticated, 
    //isRole, 
    validateInput(medicineSchema, 'body'),
    medicineController.createMedicine
);

router.put(
    '/:medicineId', 
    //needAuthenticated, 
    //isRole, 
    validateInput(medicineSchema, 'body'),
    medicineController.updateMedicine
);

router.get(
    '/:medicineId', 
    //needAuthenticated, 
    //isRole, 
    medicineController.getMedicineById
);

router.put(
    '/:medicineId/:status', 
    //needAuthenticated, 
    //isRole,
    medicineController.updateStatus
);


module.exports = router;