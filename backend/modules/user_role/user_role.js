const mongoose = require('mongoose');

const UserRoleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    roleId: {
        type: mongoose.Types.ObjectId,
        ref: 'Role',
    },
} , {
    timestamps: true
});

const UserRoleModel = mongoose.model('User_Role', UserRoleSchema);

module.exports = UserRoleModel;