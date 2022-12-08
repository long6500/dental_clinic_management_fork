const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    start_time_hours: {
        type: Number,
        min: 0,
        max: 23,
        require: true,
    },
    start_time_minutes: {
        type: Number,
        min: 0,
        max: 59,
        require: true,
    },
    end_time_hours: {
        type: Number,
        min: 0,
        max: 23,
        require: true,
    },
    end_time_minutes: {
        type: Number,
        min: 0,
        max: 59,
        require: true,
    },
    weekday: {
        type: String,
        require: true,
    }
})

const ScheduleModel = mongoose.model('Schedule', ScheduleSchema);

module.exports = ScheduleModel;