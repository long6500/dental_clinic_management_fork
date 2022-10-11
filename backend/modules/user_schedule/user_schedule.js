const mongoose = require('mongoose');

const UserScheduleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    scheduleId: {
        type: mongoose.Types.ObjectId,
        ref: 'Schedule',
    },
} , {
    timestamps: true
});

const UserScheduleModel = mongoose.model('User_Schedule', UserScheduleSchema);

module.exports = UserScheduleModel;