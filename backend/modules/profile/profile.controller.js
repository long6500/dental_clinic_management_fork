const HTTPError = require("../../common/httpError");
const ProfileModel = require("./profile");
const AuthController = require("../auth/auth.controller");
const UserScheduleModel = require("../user_schedule/user_schedule");
const ScheduleModel = require("../schedule/schedule");
const UserRoleModel = require("../user_role/user_role");

const createAdmin = async (req, res) => {
  const admin = AuthController.createUser;
  if (admin) return;
  try {
    if ((await ProfileModel.find().count()) > 0) return null;

    const profileAdmin = {
      _id: "admin",
      fullname: "Nguyễn Thành Nam",
      phone: "0974485920",
      email: process.env.EMAIL_ADMIN,
      address: "",
      userId: admin,
    };
    await ProfileModel.create(profileAdmin);
    return;
  } catch (err) {
    return err;
  }
};

const getCurProfile = async (req, res) => {
  const senderUser = req.user;

  console.log(senderUser);
  const profile = await ProfileModel.find({ userId: senderUser._id });
  console.log(profile);

  if (!profile) {
    throw new HTTPError(400, "Not found profile");
  }
  const roleId = await UserRoleModel.find({ userId: profile.userId });
  const role = roleId.map(async (id) => await RoleModel.findById(id));
  const roleArray = JSON.parse(JSON.stringify(role));

  const scheduleId = await UserScheduleModel.find({ userId: senderUser._id });
  const schedule = scheduleId.map(
    async (id) => await ScheduleModel.findById(id)
  );
  const scheduleArray = JSON.parse(JSON.stringify(schedule));
  const fullProfile = { ...profile._doc, roleArray, scheduleArray };
  res.send({ success: 1, data: fullProfile });
};

const getProfile = async (req, res, next) => {
  const profile = await ProfileModel.find({});
  res.send({ success: 1, data: medicine });
};

const createProfile = async (req, res) => {
  const senderUser = req.user;
  const {
    fullname,
    phone,
    email,
    address,
    workingDays,
    salary,
    status,
    schedule,
  } = req.body;
  const _id = await getNext();

  const newProfile = await ProfileModel.create({
    _id: _id,
    fullname,
    phone,
    email,
    address,
    workingDays,
    salary,
    status,
    createBy: senderUser._id,
  });

  var scheduleArray;
  if (schedule != null) {
    scheduleArray = JSON.parse(JSON.stringify(schedule));
    scheduleArray.forEach(async (element) => {
      const temp = JSON.parse(element);

      const existSchedule = await ScheduleModel.find({
        start_time_hours: temp.start_time_hours,
        start_time_minutes: temp.start_time_minutes,
        start_time_session: temp.start_time_session,
        end_time_hours: temp.end_time_hours,
        end_time_minutes: temp.end_time_minutes,
        end_time_session: temp.end_time_session,
        weekday: temp.weekday,
      });

      if (!existSchedule) {
        const newSchedule = await ScheduleModel.create({
          start_time_hours: temp.start_time_hours,
          start_time_minutes: temp.start_time_minutes,
          start_time_session: temp.start_time_session,
          end_time_hours: temp.end_time_hours,
          end_time_minutes: temp.end_time_minutes,
          end_time_session: temp.end_time_session,
          weekday: temp.weekday,
        });

        await UserScheduleModel.create({
          userId: _id,
          scheduleId: newSchedule._id,
        });
      } else {
        await UserScheduleModel.create({
          userId: _id,
          scheduleId: temp.medicineId,
        });
      }
    });

    scheduleArray.forEach(async (element) => {
      const temp = JSON.parse(element);

      await UserScheduleModel.create({
        userId: _id,
        scheduleId: existSchedule._id,
      });
    });
  }

  const fullProfile = {
    ...newService._doc,
    consumableArray,
    prescriptionArray,
  };
  res.send({ success: 1, data: fullService });
};

const updateService = async (req, res) => {
  const senderUser = req.user;
  const { serviceId } = req.params;
  const {
    name,
    imageUrl,
    time,
    price,
    note,
    status,
    consumable,
    prescription,
  } = req.body;
  const imgUrl = req.file.path;
  const existService = await ServiceModel.findOne({ _id: serviceId });
  if (!existService) {
    throw new HTTPError(400, "Not found service");
  }

  const updatedService = await ServiceModel.findByIdAndUpdate(
    serviceId,
    {
      name,
      imageUrl: imgUrl,
      time,
      price,
      note,
      status,
      modifyBy: senderUser._id,
    },
    { new: true }
  );

  await ConsumableModel.deleteMany({ serviceId: serviceId });
  var consumableArray;
  if (consumable != null) {
    consumableArray = JSON.parse(JSON.stringify(consumable));
    consumableArray.forEach(async (element) => {
      const temp = JSON.parse(element);

      await ConsumableModel.create({
        serviceId: _id,
        medicineId: temp.medicineId,
        numberOfUses: temp.numberOfUses,
        createBy: senderUser._id,
      });
    });
  }

  await PrescriptionModel.deleteMany({ serviceId: serviceId });
  var prescriptionArray;
  if (prescription != null) {
    prescriptionArray = JSON.parse(JSON.stringify(prescription));
    prescriptionArray.forEach(async (element) => {
      const temp = JSON.parse(element);

      await PrescriptionModel.create({
        serviceId: _id,
        medicineId: element.medicineId,
        quantity: element.quantity,
        usage: element.usage,
        createBy: senderUser._id,
      });
    });
  }

  const fullService = {
    ...updateService._doc,
    consumableArray,
    prescriptionArray,
  };
  res.send({ success: 1, data: fullService });
};

const getServiceById = async (req, res) => {
  const { serviceId } = req.params;

  const service = await ServiceModel.findById(serviceId);
  const consumable = await ConsumableModel.find({ serviceId: serviceId });
  const prescription = await PrescriptionModel.find({ serviceId: serviceId });
  const consumableArray = JSON.parse(JSON.stringify(consumable));
  const prescriptionArray = JSON.parse(JSON.stringify(prescription));

  if (!service) {
    throw new HTTPError(400, "Not found service");
  }

  const fullService = { ...service._doc, consumableArray, prescriptionArray };
  res.send({ success: 1, data: fullService });
};

const updateStatus = async (req, res) => {
  const senderUser = req.user;
  const { serviceId, status } = req.params;

  const existService = await ServiceModel.findOne({ _id: serviceId });
  if (!existService) {
    throw new HTTPError(400, "Not found service");
  }

  const updatedService = await ServiceModel.findByIdAndUpdate(
    serviceId,
    {
      status,
      modifyBy: senderUser._id,
    },
    { new: true }
  );

  res.send({ success: 1, data: updatedService });
};

const getNext = async () => {
  const count = await ProfileModel.find().count();
  if (count <= 0) return "NV_0000000001";

  const lastService = await ProfileModel.find().sort({ _id: -1 }).limit(1);
  const nextId = lastService[0]._id;
  const idNumber = parseInt(nextId.split("_")[1]) + 1 + "";
  var temp = "";
  for (let i = 0; i < 10 - idNumber.length; i++) {
    temp += "0";
  }
  temp += idNumber;
  return "NV_" + temp;
};

module.exports = {
  createAdmin,
  getProfile,
  createProfile,
  getCurProfile,
};
