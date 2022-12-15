const express = require('express');
const router = express.Router();
const roleController = require('./role.controller');

router.get('/', roleController.getRole);

router.get('/allRole', roleController.getAllRole);

module.exports = router;