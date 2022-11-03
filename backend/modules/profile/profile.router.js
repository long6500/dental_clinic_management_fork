const express = require('express');
const router = express.Router();
const profileController = require('./profile.controller');
const validateInput = require('../../middlewares/validateInput');
const { profileSchema }= require('./profile.validation');
const needAuthenticated = require('../../middlewares/needAuthenticated');


router.get(
  '/',
  profileController.getProfile
);



module.exports = router;