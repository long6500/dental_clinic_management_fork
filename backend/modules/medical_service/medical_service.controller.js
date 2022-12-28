const MedicalServiceModel = require("./medical_service");
const HTTPError = require("../../common/httpError");
const ProfileModel = require("../profile/profile");
const MedicalTechModel = require("../medical_tech/medical_tech");
const e = require("express");

const addService = async (req, res) => {
  const senderUser = req.user;
  const { medicalPaperId, serviceId, customerId } = req.params;

  const newMedicalService = await MedicalServiceModel.create({
    medicalPaperId: medicalPaperId,
    serviceId: serviceId,
    customerId: customerId,
    createBy: senderUser._id,
  });
  res.send({ success: 1, data: newMedicalService });
};

const deleteService = async (req, res) => {
  const senderUser = req.user;
  const { medicalServiceId } = req.params;

  const newMedicalService = await MedicalServiceModel.findByIdAndDelete(
    medicalServiceId
  );
  res.send({ success: 1, data: newMedicalService });
};

const addTechStaff = async (req, res) => {
  const { medicalServiceId } = req.params;
  const { listKTV } = req.body;

  let temp = [];
  if (listKTV) {
    await MedicalTechModel.deleteMany({
      medicalService: medicalServiceId,
    });
    listKTV.forEach((element) => {
      temp.push({
        dateDoing: new Date(element[0]),
        techId: element[1][0].id,
        medicalService: medicalServiceId,
      });
    });
    const newMedicalService = await MedicalTechModel.create(temp);

    res.send({ success: 1, data: newMedicalService });
  }
  res.send({ success: 0, data: null });
};

const getTechStaff = async (req, res) => {
  const { medicalServiceId } = req.params;
  const tech = await MedicalTechModel.find({
    medicalService: medicalServiceId,
  }).sort({ dateDoing: 1 });
  let temp = [];
  await Promise.all(
    tech.map(async (element) => {
      const techStaff = await ProfileModel.findById(element.techId);
      temp.push({ ...element._doc, name: techStaff.fullname });
    })
  );
  console.log(temp);
  res.send({ success: 1, data: temp });
};

const getMedicalPaperWithService = async (req, res) => {
  const senderUser = req.user;
  const role = req.role;
  const { keyword, offset, limit, startDate, endDate } = req.query;

  const offsetNumber = offset && Number(offset) ? Number(offset) : 0;
  const limitNumber = limit && Number(limit) ? Number(limit) : 5;

  let filter = {};

  if (startDate && endDate) {
    const fromDate = new Date(startDate);
    fromDate.setHours(0);

    const toDate = new Date(endDate);
    toDate.setHours(24);
    filter.createdAt = { $gte: fromDate, $lte: toDate };
  }

  if (role[0].name !== "Admin") {
    const techStaff = await ProfileModel.findOne({ userId: senderUser._id });
    filter.techStaffId = techStaff._id;
  }

  const [listMedicalService, total] = await Promise.all([
    MedicalServiceModel.find(filter)
      .populate({ path: "customerId", select: "fullname" })
      .populate({ path: "serviceId", select: "name" })
      .populate({ path: "medicalPaperId", select: "status" })
      .skip(offsetNumber * limitNumber)
      .limit(limitNumber),
    MedicalServiceModel.count(filter),
  ]);

  let tempList = [];
  let tempTotal = 0;
  await Promise.all(
    listMedicalService.map((element) => {
      if (Number(element.medicalPaperId.status) !== 0) {
        tempList.push({ ...element._doc });
        tempTotal += 1;
      }
    })
  );
  if (keyword) {
    let listMedicalServiceArray = [];
    let totalListMedicalService = 0;
    await Promise.all(
      listMedicalService.map((element) => {
        if (
          element.medicalPaperId
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
          element.customerId._id
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
          element.customerId.fullname
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
          element.serviceId._id.toLowerCase().includes(keyword.toLowerCase()) ||
          element.serviceId.name.toLowerCase().includes(keyword.toLowerCase())
        ) {
          listMedicalServiceArray.push({ ...element._doc });
          totalListMedicalService++;
        }
      })
    );

    res.send({
      success: 1,
      data: { data: listMedicalServiceArray, total: totalListMedicalService },
    });
    return;
  }
  res.send({
    success: 1,
    data: { data: tempList, total: tempTotal },
  });
};

const updateStatus = async (req, res) => {
  const senderUser = req.user;
  const role = req.role;
  const { medicalServiceId, status } = req.params;

  const existMedicalService = await MedicalServiceModel.findOne({
    _id: medicalServiceId,
  });
  if (!existMedicalService) {
    throw new HTTPError(400, "Not found medical service");
  }
  if (role[0].name !== "Admin") {
    const profile = await ProfileModel.findOne({ userId: senderUser._id });
    if (profile._id !== existMedicalService.techStaffId) {
      throw new HTTPError(500, "Not Auth");
    }
  }

  const newMedicalService = await MedicalServiceModel.findByIdAndUpdate(
    medicalServiceId,
    { status: status },
    { new: true }
  );

  res.send({
    success: 1,
    data: newMedicalService,
  });
};

const getHistory = async (req, res) => {
  const { customerId } = req.params;

  const filter = {};
  filter.customerId = customerId;
  filter.createdAt = { $lt: new Date() };
  const newMedicalService = await MedicalServiceModel.aggregate([
    {
      $match: filter,
    },
    {
      $lookup: {
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "serviceItem",
      },
    },
    {
      $lookup: {
        from: "medicalpapers",
        localField: "medicalPaperId",
        foreignField: "_id",
        as: "medicalPaperItem",
      },
    },
  ]);

  res.send({
    success: 1,
    data: newMedicalService,
  });
};

module.exports = {
  getMedicalPaperWithService,
  updateStatus,
  getHistory,
  addTechStaff,
  addService,
  deleteService,
  getTechStaff,
};
