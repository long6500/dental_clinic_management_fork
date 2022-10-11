const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const validateInput = require('../../middlewares/validateInput');
const { loginSchema, registerSchema }= require('./auth.validation');

// const wrapHandleError = (controller) => {
//   return async (req, res, next) => {
//     try {
//       await controller(req, res, next);
//     } catch { 
//       next(err);
//     }
//   }
// }
// function (req, res, next) 

router.post(
  '/register',
  validateInput(registerSchema, 'body'),
  authController.register
);

router.post(
  '/login',
  validateInput(loginSchema, 'body'),
  authController.login
);


module.exports = router;