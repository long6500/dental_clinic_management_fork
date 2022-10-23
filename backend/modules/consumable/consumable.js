const mongoose = require('mongoose');

const ConsumableSchema = new mongoose.Schema({
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
    numberOfUses: {
        type: Number,
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

const ConsumableModel = mongoose.model('Consumable', ConsumableSchema);

module.exports = ConsumableModel