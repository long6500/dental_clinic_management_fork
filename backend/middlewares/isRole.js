const jwt = require('jsonwebtoken');
const UserRoleController = require('../modules/user_role/user_role.controller');
const HttpError = require('../common/httpError');

const isRole = async () => { 
  return async (req, res, next) => { 
    const senderUser = req.user;
    const listRoleOfUser = await UserRoleController.getRoleByUserId(senderUser._id);
    req.role = listRoleOfUser;
    next();
}}

module.exports = isRole;