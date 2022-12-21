const express = require("express");
const router = express.Router();
const needAuthenticated = require("../../middlewares/needAuthenticated");
const statisticalController = require("./statistical.controller");

router.get(
  "/forLineChart",
  needAuthenticated,
  statisticalController.getCustomerMonth
);

router.get(
  "/forPieChart",
  needAuthenticated,
  statisticalController.getCustomerWeek
);

router.get(
  "/forDashBoard",
  needAuthenticated,
  statisticalController.getStatisticalDash
);

router.get(
    "/forPieChart",
    needAuthenticated,
    statisticalController.getCustomerWeek
);

router.get(
    '/getMostService',
    needAuthenticated,
    statisticalController.getStatisticalDash,
);

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

router.post(
  "/byPayment",
  needAuthenticated,
  statisticalController.statisticalForPayment
);

router.post(
  "/byDate",
  needAuthenticated,
  statisticalController.statisticalForDate
);

module.exports = router;
