const express = require("express");
const router = express.Router();
const medicalServiceController = require("./medical_service.controller");
const needAuthenticated = require("../../middlewares/needAuthenticated");
const isRole = require("../../middlewares/isRole");
const validateInput = require("../../middlewares/validateInput");

router.get(
  "/",
  needAuthenticated,
  //isRole,
  medicalServiceController.getMedicalPaperWithService
);

router.get(
  "/getHistory/:customerId",
  needAuthenticated,
  //isRole,
  medicalServiceController.getHistory
);

router.put(
  "/updateStatus/:medicalServiceId/:status",
  needAuthenticated,
  //isRole,
  medicalServiceController.updateStatus
);

module.exports = router;
