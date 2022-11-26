const mongoose = require('mongoose');

const UserScheduleSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'Profile',
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