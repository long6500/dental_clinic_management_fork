const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true,
    },
    fullname: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: Number,
        default: 0,
    },
    job: {
        type: String,
    },
    bloodGroup: {
        type: String,
    },
    address: {
        type: String,
    },
    note: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
        require: true,
    },
    createBy: {
        type: mongoose.Types.ObjectId,
    },
    modifyBy: {
        type: mongoose.Types.ObjectId,
    },
    systemicMedicalHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SystemicMedicalHistory"
        }
    ],
    dentalMedicalHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DentalMedicalHistory"
        }
    ]
} , {
    timestamps: true
});

const CustomerModel = mongoose.model('Customer', CustomerSchema);

module.exports = CustomerModel;