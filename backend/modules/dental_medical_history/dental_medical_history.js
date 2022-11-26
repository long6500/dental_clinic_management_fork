const mongoose = require('mongoose');

const DentalMedicalHistorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

} , {
    timestamps: true
});

const DentalMedicalHistoryModel = mongoose.model('DentalMedicalHistory', DentalMedicalHistorySchema);

module.exports = DentalMedicalHistoryModel;