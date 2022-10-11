const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

} , {
    timestamps: true
});

const RoleModel = mongoose.model('Role', RoleSchema);

module.exports = RoleModel;