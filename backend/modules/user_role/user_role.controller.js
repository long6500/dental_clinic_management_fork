const UserRoleModel = require('./user_role');
const HTTPError = require('../../common/httpError');

const getRoleByUserId = async (userId) => {
    const roleOfUser = await UserRoleModel.find({userId: userId});
    return { success: 1, data: roleOfUser }
}

module.exports = {
    getRoleByUserId,
}