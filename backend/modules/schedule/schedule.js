const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    start_time: {
        type: Date,
        require: true,
    },
    end_time: {
        type: Date,
        require: true,
    },
    weekday: {
        type: String,
        require: true,
    }
})

const ScheduleModel = mongoose.model('Schedule', ScheduleSchema);

module.exports = ScheduleModel;