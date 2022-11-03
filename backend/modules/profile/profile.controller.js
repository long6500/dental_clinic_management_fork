const HTTPError = require("../../common/httpError");
const ProfileModel = require("./profile");
const AuthController = require('../auth/auth.controller');

const createAdmin = async (req, res) => {
    const admin = AuthController.createUser();
    if(admin) return;
    try {
      if (await ProfileModel.find().count() > 0) return null;

      const profileAdmin = { _id: "admin", fullname: 'Nguyễn Thành Nam', phone:'0974485920', email: process.env.EMAIL_ADMIN, address:'', userId: admin};
      await ProfileModel.create(profileAdmin);
      return;
  } catch (err) {
      return err;
  }
};

const getProfile = async (req, res, next) => {
    const profile = await ProfileModel.find({});
    res.send({ success: 1, data: medicine });
};


module.exports = {
    getProfile,
};