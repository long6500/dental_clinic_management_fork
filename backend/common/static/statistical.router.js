const express = require("express");
const router = express.Router();
const needAuthenticated = require("../../middlewares/needAuthenticated");
const statisticalController = require("./statistical.controller");

router.post(
  "/byCustomer",
  needAuthenticated,
  statisticalController.statisticalForCustomer
);

router.post(
  "/byService",
  needAuthenticated,
  statisticalController.statisticalForService
);

router.post(
  "/byEmployee",
  needAuthenticated,
  statisticalController.statisticalForEmployee
);

module.exports = router;
