const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const validateInput = require('../../middlewares/validateInput');
const { loginSchema, forgotSchema, changeSchema } = require('./auth.validation');
const needAuthenticated = require('../../middlewares/needAuthenticated');

router.post(
  '/login',
  validateInput(loginSchema, 'body'),
  authController.login
);

router.post(
  '/changePassword',
  needAuthenticated,
  validateInput(changeSchema, 'body'),
  authController.changePassword
);

router.post(
  '/forgotPassword',
  validateInput(forgotSchema, 'body'),
  authController.forgotPassword
);

router.get(
  '/verify', 
  needAuthenticated,
  authController.verify
);

// router.get(
//   '/register', 
//   //needAuthenticated,
//   authController.register
// );

module.exports = router;