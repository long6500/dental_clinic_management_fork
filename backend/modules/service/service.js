const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    imageUrl: {
        type: String,
        require: true,
    },
    time: {
        type: Number,
        require: true,
    },
    price: {
        type: mongoose.Types.Decimal128,
        require: true,
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
    }
}, {
    timestamps: true
});

const ServiceModel = mongoose.model('Service', ServiceSchema);

module.exports = ServiceModel