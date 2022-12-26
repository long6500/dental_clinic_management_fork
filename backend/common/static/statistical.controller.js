const BillModel = require("../../modules/bill/bill");
const MedicalPaperModel = require("../../modules/medical_paper/medical_paper");
const CustomerModel = require("../../modules/customer/customer");
const MedicalServiceModel = require("../../modules/medical_service/medical_service");
const ServiceModel = require("../../modules/service/service");
const e = require("express");
const ProfileModel = require("../../modules/profile/profile");

function findIndexByProperty(data, key, value) {
  for (var i = 0; i < data.length; i++) {
    if (data[i][key].toString() === value.toString()) {
      return i;
    }
  }
  return -1;
}

const statisticalForCustomer = async (req, res) => {

  const { startCustomer, startEmployee, startService, startDate, endDate } =
    req.body;

  let filter = {};
  if (startCustomer && startCustomer !== "Chọn tất cả")
    filter.customerId = startCustomer;
  if (startEmployee && startEmployee !== "Chọn tất cả")
    filter.createBy = startEmployee;

  if (
    startDate ||
    endDate ||
    startDate !== "undefined" ||
    endDate !== "undefined"
  ) {
    const fromDate = new Date(startDate);
    fromDate.setHours(0);

    const toDate = new Date(endDate);
    toDate.setHours(24);
    filter.createdAt = { $gte: fromDate, $lt: toDate };
  }

  let filterService = {};

  if (startService && startService !== "Chọn tất cả")
    filterService.serviceId = startService;

  const staticstical = await MedicalPaperModel.aggregate([
    {
      $lookup: {
        from: "medicalservices",
        localField: "_id",
        foreignField: "medicalPaperId",
        pipeline: [{ $match: filterService }],
        as: "service",
      },
    },
    {
      $match: filter,
    },
    {
      $group: {
        _id: { customerId: "$customerId" },
        totalAmount: { $sum: "$totalAmount" },
        customerPayment: { $sum: "$customerPayment" },
        count: { $sum: 1 },

        service: { $addToSet: "$service" },

      },
    },
  ]);

  let staticsticalTemp = [];
  await Promise.all(
    staticstical.map(async (element) => {
      const customerTemp = await CustomerModel.findById(element._id.customerId);
      let temp = 0;
      element.service.map((e) => {
        if (e.length > 0) temp++;

      });

      if (temp > 0) {
        staticsticalTemp.push({
          ...element,
          customerName: customerTemp.fullname,
        });
      }
    })
  );

  res.send({ success: 1, data: staticsticalTemp });
};

const statisticalForService = async (req, res) => {

  const { startCustomer, startEmployee, startService, startDate, endDate } =
    req.body;

  let filter = {};
  if (startCustomer && startCustomer !== "Chọn tất cả")
    filter.customerId = startCustomer;
  if (startEmployee && startEmployee !== "Chọn tất cả")
    filter.createBy = startEmployee;

  if (
    startDate ||
    endDate ||
    startDate !== "undefined" ||
    endDate !== "undefined"
  ) {
    const fromDate = new Date(startDate);
    fromDate.setHours(0);

    const toDate = new Date(endDate);
    toDate.setHours(24);
    filter.createdAt = { $gte: fromDate, $lt: toDate };
  }

  let filterService = {};

  if (startService && startService !== "Chọn tất cả")
    filterService.serviceId = startService;

  const staticstical = await MedicalServiceModel.aggregate([
    {
      $match: filterService,
    },
    {
      $lookup: {
        from: "medicalpapers",
        localField: "medicalPaperId",
        foreignField: "_id",
        pipeline: [{ $match: filter }],
        as: "medicalPaper",
      },
    },
    {
      $group: {
        _id: { serviceId: "$serviceId" },
        count: { $sum: 1 },

        medicalPaper: { $addToSet: "$medicalPaper" },

      },
    },
  ]);

  let staticsticalTemp = [];
  await Promise.all(
    staticstical.map(async (element) => {
      const serviceTemp = await ServiceModel.findById(element._id.serviceId);
      let temp = 0;
      element.medicalPaper.map((e) => {
        if (e.length > 0) temp++;

      });

      if (temp > 0) {
        staticsticalTemp.push({
          ...element,
          serviceName: serviceTemp.name,
          price: serviceTemp.price,
        });
      }
    })
  );

  res.send({ success: 1, data: staticsticalTemp });
};

const statisticalForEmployee = async (req, res) => {

  const { startCustomer, startEmployee, startService, startDate, endDate } =
    req.body;

  let filter = {};
  if (startCustomer && startCustomer !== "Chọn tất cả")
    filter.customerId = startCustomer;
  if (startEmployee && startEmployee !== "Chọn tất cả")
    filter.createBy = startEmployee;

  if (
    startDate ||
    endDate ||
    startDate !== "undefined" ||
    endDate !== "undefined"
  ) {
    const fromDate = new Date(startDate);
    fromDate.setHours(0);

    const toDate = new Date(endDate);
    toDate.setHours(24);
    filter.createdAt = { $gte: fromDate, $lt: toDate };
  }

  let filterService = {};

  if (startService && startService !== "Chọn tất cả")
    filterService.serviceId = startService;

  const staticstical = await MedicalPaperModel.aggregate([
    {
      $lookup: {
        from: "medicalservices",
        localField: "_id",
        foreignField: "medicalPaperId",
        pipeline: [{ $match: filterService }],
        as: "service",
      },
    },
    {
      $match: filter,
    },
    {
      $group: {
        _id: { createBy: "$createBy" },
        totalAmount: { $sum: "$totalAmount" },
        customerPayment: { $sum: "$customerPayment" },
        count: { $sum: 1 },

        service: { $addToSet: "$service" },

      },
    },
  ]);

  let staticsticalTemp = [];
  await Promise.all(
    staticstical.map(async (element) => {
      const profileTemp = await ProfileModel.findById(element._id.createBy);
      let temp = 0;
      element.service.map((e) => {
        if (e.length > 0) temp++;

      });

      if (temp > 0) {
        staticsticalTemp.push({
          ...element,
          employeeName: profileTemp.fullname,
        });
      }
    })
  );
  res.send({ success: 1, data: staticsticalTemp });
};

const statisticalForPayment = async (req, res) => {

  const { startCustomer, startEmployee, startService, startDate, endDate } =
    req.body;

  let filter = {};
  if (startCustomer && startCustomer !== "Chọn tất cả")
    filter.customerId = startCustomer;
  if (startEmployee && startEmployee !== "Chọn tất cả")
    filter.createBy = startEmployee;

  if (
    startDate ||
    endDate ||
    startDate !== "undefined" ||
    endDate !== "undefined"
  ) {
    const fromDate = new Date(startDate);
    fromDate.setHours(0);

    const toDate = new Date(endDate);
    toDate.setHours(24);
    filter.createdAt = { $gte: fromDate, $lt: toDate };
  }

  let filterService = {};

  if (startService && startService !== "Chọn tất cả")
    filterService.serviceId = startService;

  const staticstical = await MedicalPaperModel.aggregate([
    {
      $lookup: {
        from: "medicalservices",
        localField: "_id",
        foreignField: "medicalPaperId",
        pipeline: [{ $match: filterService }],
        as: "service",
      },
    },
    {
      $match: filter,
    },
  ]);

  let billTemp = [];
  await Promise.all(
    staticstical.map(async (element) => {
      if (element.service.length > 0) {
        const bill = await BillModel.find({
          medicalPaperId: element._id,
        }).populate({ path: "paymentId", select: "name" });
        if (bill.length > 0) {
          bill.forEach((element2) => {
            billTemp.push(element2);
          });
        }
      }
    })
  );

  if (billTemp.length > 0) {
    let staticsticalTemp = [];
    await Promise.all(
      billTemp.map(async (element) => {
        let index = findIndexByProperty(
          staticsticalTemp,
          "_id",
          element.paymentId._id

        );

        if (index < 0) {
          staticsticalTemp.push({
            _id: element.paymentId._id,
            payment: element.paymentId.name,
            amount: Number(element.amount),
            count: 1,
          });
        } else {
          staticsticalTemp[index] = {
            _id: staticsticalTemp[index]._id,
            payment: staticsticalTemp[index].payment,
            amount:
              Number(element.amount) + Number(staticsticalTemp[index].amount),
            count: staticsticalTemp[index].count + 1,
          };
        }
      })
    );
    res.send({ success: 1, data: staticsticalTemp });
    return;
  }
  res.send({ success: 1, data: [] });
};

const statisticalForDate = async (req, res) => {

  const {
    startCustomer,
    startEmployee,
    startService,
    startDate,
    endDate,
  } = req.body;

  let filter = {};
  if (startCustomer && startCustomer !== "Chọn tất cả") filter.customerId = startCustomer;
  if (startEmployee && startEmployee !== "Chọn tất cả") filter.createBy = startEmployee;

  if (
    startDate ||
    endDate ||
    startDate !== "undefined" ||
    endDate !== "undefined"
  ) {
    const fromDate = new Date(startDate);
    fromDate.setHours(0);

    const toDate = new Date(endDate);
    toDate.setHours(24);
    filter.createdAt = { $gte: fromDate, $lt: toDate };
  }

  let filterService = {};

  if (startService && startService !== "Chọn tất cả")
    filterService.serviceId = startService;

  const staticstical = await MedicalPaperModel.aggregate([
    {
      $lookup: {
        from: "medicalservices",
        localField: "_id",
        foreignField: "medicalPaperId",
        pipeline: [{ $match: filterService }],
        as: "service",
      },
    },
    {
      $match: filter,
    },
    {
      $group: {
        _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
        totalAmount: { $sum: "$totalAmount" },
        customerPayment: { $sum: "$customerPayment" },
        count: { $sum: 1 },

        service: { $addToSet: "$service" },

      },
    },
  ]);

  let staticsticalTemp = [];
  await Promise.all(
    staticstical.map(async (element) => {
      let temp = 0;
      element.service.map((e) => {
        if (e.length > 0) temp++;

      });

      if (temp > 0) {
        staticsticalTemp.push({
          ...element,
        });
      }
    })
  );
  res.send({ success: 1, data: staticsticalTemp });

};

const getStatisticalDash = async (req, res) => {
  const service = await MedicalServiceModel.aggregate([
    {
      $lookup: {
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "service",
      },
    },
    {
      $group: {
        _id: { serviceId: "$serviceId" },
        count: { $sum: 1 },
        service: { $addToSet: "$service" },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const [totalCustomer, totalCustomerInMonth] = await Promise.all([
    CustomerModel.count(),
    CustomerModel.count({
      createdAt: {
        $gte: new Date(year, month, 0),
        $lt: new Date(year, month + 1, 0),
      },
    }),
  ]);

  const [totalService, totalServiceInMonth] = await Promise.all([
    ServiceModel.count(),
    ServiceModel.count({
      createdAt: {
        $gte: new Date(year, month, 0),
        $lt: new Date(year, month + 1, 0),
      },
    }),
  ]);

  const [totalEmployee, totalEmployeeInMonth] = await Promise.all([
    ProfileModel.count(),
    ProfileModel.count({
      createdAt: {
        $gte: new Date(year, month, 0),
        $lt: new Date(year, month + 1, 0),
      },
    }),
  ]);

  const [totalMedical, totalMedicalInMonth] = await Promise.all([
    MedicalPaperModel.count(),
    MedicalPaperModel.count({
      createdAt: {
        $gte: new Date(year, month, 0),
        $lt: new Date(year, month + 1, 0),
      },
    }),
  ]);
  res.send({
    success: 1,
    data: {
      ...service,
      totalCustomer,
      totalCustomerInMonth,
      totalService,
      totalServiceInMonth,
      totalEmployee,
      totalEmployeeInMonth,
      totalMedical,
      totalMedicalInMonth,
    },
  });
};

const getCustomerWeek = async (req, res) => {
  const today = new Date();
  const date = today.getDay();
  let numberCustomer = [];
  let count = 0;
  switch (date) {
    case 1:
      count = 7;
      break;
    case 0:
      count = 6;
      break;
    default:
      count = date - 1;
      break;
  }

  for (let i = count; i >= 1; i--) {
    let fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - i);
    fromDate.setHours(0);

    let toDate = new Date();
    toDate.setDate(toDate.getDate() - i);
    toDate.setHours(24);

    const number = await MedicalPaperModel.count({
      createdAt: { $gte: fromDate, $lt: toDate },
    });
    numberCustomer.push(number);
  }
  res.send({ success: 1, data: numberCustomer });
};

const getCustomerMonth = async (req, res) => {
  const today = new Date();
  const month = today.getMonth();
  let numberCustomer = [];
  let count = 0;
  switch (month) {
    case 0:
      count = 12;
      break;
    default:
      count = month;
      break;
  }
  if(count !== 12){
    for (let i = count; i >= 0; i--) {
      let fromDate = new Date(today.getFullYear(), month-i, 1);
      fromDate.setHours(0);
  
      let toDate = new Date(today.getFullYear(), month-i+1, 0);
      toDate.setHours(24);
      const number = await MedicalPaperModel.count({ createdAt: { $gte: fromDate, $lt: toDate } });
      numberCustomer.push(number);
    }
  }else{
    for (let i = 1; i <= 12; i++) {
      let fromDate = new Date(today.getFullYear()-1, i, 1);
      fromDate.setHours(0);
  
      let toDate = new Date(today.getFullYear()-1, i+1, 0);
      toDate.setHours(24);
      const number = await MedicalPaperModel.count({ createdAt: { $gte: fromDate, $lt: toDate } });
      numberCustomer.push(number);
    }
  }
  res.send({ success: 1, data: numberCustomer })
}

module.exports = {
  statisticalForCustomer,
  statisticalForService,
  statisticalForEmployee,
  statisticalForPayment,
  statisticalForDate,
  getStatisticalDash,
  getCustomerWeek,
  getCustomerMonth,
};
