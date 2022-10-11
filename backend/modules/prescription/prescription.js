const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
    serviceId: {
        type: String,
        require: true,
        ref: 'Service'
    },
    medicineId: {
        type: String,
        require: true,
        ref: 'Medicine'
    },
    quantity: {
        type: Number,
        require: true,
    },
    usage: {
        type: String,
        require: true,
    },
    createBy: {
        type: mongoose.Types.ObjectId,
    },
    modifyBy: {
        type: mongoose.Types.ObjectId,
    }
}, {
    timestamps: true
});

const PrescriptionModel = mongoose.model('Prescription', PrescriptionSchema);

module.exports = PrescriptionModel