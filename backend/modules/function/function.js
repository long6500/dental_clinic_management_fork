const mongoose = require('mongoose');

const FunctionSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

} , {
    timestamps: true
});

const FunctionModel = mongoose.model('Function', FunctionSchema);

module.exports = FunctionModel;