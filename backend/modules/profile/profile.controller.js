const Profile = require("./profile");
const HTTPError = require("../../common/httpError");

const getProfile = async (req, res, next) => {
    const medicine = await MedicineModel.find({});
    res.send({ success: 1, data: medicine });
};

const getProfileById = async (req, res, next) => {
    const medicine = await MedicineModel.find({});
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

module.exports = {
    getProfile,
    getProfileById,
    updateStatus,
  };