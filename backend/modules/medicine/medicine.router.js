const express = require('express');
const router = express.Router();
const medicineController = require('./medicine.controller');
const needAuthenticated = require('../../middlewares/needAuthenticated');
const isRole = require('../../middlewares/isRole');
const medicineSchema = require('./medicine.validation');
const validateInput = require('../../middlewares/validateInput')
const fileUploader = require('../../middlewares/cloudinary.config');

router.get(
    '/', 
    needAuthenticated, 
    // isRole, 
    medicineController.getMedicine
);

router.get(
    '/activeMedicine', 
    needAuthenticated, 
    // isRole, 
    medicineController.getActiveMedicine
);

router.post(
    '/', 
    needAuthenticated, 
    // isRole, 
    fileUploader.single('imageUrl'),
    validateInput(medicineSchema, 'body'),
    medicineController.createMedicine
);

router.put(
    '/:medicineId', 
    needAuthenticated, 
    // isRole, 
    fileUploader.single('imageUrl'),
    validateInput(medicineSchema, 'body'),
    medicineController.updateMedicine
);

router.get(
    '/:medicineId', 
    needAuthenticated, 
    // isRole, 
    medicineController.getMedicineById
);

router.put(
    '/:medicineId/:status', 
    needAuthenticated, 
    // isRole,
    medicineController.updateStatus
);


module.exports = router;