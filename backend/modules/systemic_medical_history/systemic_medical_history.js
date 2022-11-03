const mongoose = require('mongoose');

const SystemicMedicalHistorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

} , {
    timestamps: true
});

const SystemicMedicalHistoryModel = mongoose.model('SystemicMedicalHistory', SystemicMedicalHistorySchema);

module.exports = SystemicMedicalHistoryModel;