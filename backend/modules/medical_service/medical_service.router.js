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

router.get(
  "/getTechStaff/:medicalServiceId",
  needAuthenticated,
  //isRole,
  medicalServiceController.getTechStaff
);

router.put(
  "/updateStatus/:medicalServiceId/:status",
  needAuthenticated,
  //isRole,
  medicalServiceController.updateStatus
);

router.post(
  "/addTechStaff/:medicalServiceId",
  needAuthenticated,
  //isRole,
  medicalServiceController.addTechStaff
);

router.post(
  "/addService/:medicalPaperId/:serviceId/:customerId",
  needAuthenticated,
  //isRole,
  medicalServiceController.addService
);

router.delete(
  "/deleteService/:medicalServiceId",
  needAuthenticated,
  //isRole,
  medicalServiceController.deleteService
);

module.exports = router;
