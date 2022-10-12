const MedicineModel = require("./medicine");
const HTTPError = require("../../common/httpError");

const getMedicine = async (req, res, next) => {
  const medicine = await MedicineModel.find({});
  res.send({ success: 1, data: medicine });
};

const createMedicine = async (req, res) => {
  // const senderUser = req.user;
  const {
    name,
    imageUrl,
    quantity,
    price,
    purchasePrice,
    unit,
    usage,
    expiredDay,
  } = req.body;
  // console.log(await getNext());
  const medID = await getNext();
  const newMedicine = await MedicineModel.create({
    _id: medID,
    name,
    imageUrl,
    quantity,
    price,
    purchasePrice,
    unit,
    usage,
    expiredDay,
    // createBy: senderUser._id,
  });
  res.send({ success: 1, data: newMedicine });
};

const updateMedicine = async (req, res) => {
  const senderUser = req.user;
  const { medicineId } = req.params;
  const {
    name,
    imageUrl,
    quantity,
    price,
    purchasePrice,
    unit,
    usage,
    expiredDay,
    status,
  } = req.body;

  const existMedicine = await MedicineModel.findOne({ _id: medicineId });
  if (!existMedicine) {
    throw new HTTPError(400, "Not found medicine");
  }

  const updatedMedicine = await MedicineModel.findByIdAndUpdate(
    medicineId,
    {
      name,
      imageUrl,
      quantity,
      price,
      purchasePrice,
      unit,
      usage,
      expiredDay,
      status,
      modifyBy: senderUser._id,
    },
    { new: true }
  );

  res.send({ success: 1, data: updatedMedicine });
};

const getMedicineById = async (req, res) => {
  const { medicineId } = req.params;

  const medicine = await MedicineModel.findById(medicineId);

  res.send({ success: 1, data: medicine });
};

const updateStatus = async (req, res) => {
  const senderUser = req.user;
  const { medicineId, status } = req.params;

  const existMedicine = await MedicineModel.findOne({ _id: medicineId });
  if (!existMedicine) {
    throw new HTTPError(400, "Not found medicine");
  }

  const updatedMedicine = await MedicineModel.findByIdAndUpdate(
    medicineId,
    {
      status,
      modifyBy: senderUser._id,
    },
    { new: true }
  );

  res.send({ success: 1, data: updatedMedicine });
};

const getNext = async () => {
  const count = await MedicineModel.find().count();
  if (count <= 0) return "SP_0000000001";

  const lastMedicine = await MedicineModel.find().sort({ _id: -1 }).limit(1);
  const nextId = lastMedicine[0]._id;
  const idNumber = parseInt(nextId.split("_")[1]) + 1 + "";
  var temp = "";
  for (let i = 0; i < 10 - idNumber.length; i++) {
    temp += "0";
  }
  temp += idNumber;
  return "SP_" + temp;
};

module.exports = {
  getMedicine,
  createMedicine,
  updateMedicine,
  getMedicineById,
  updateStatus,
};
