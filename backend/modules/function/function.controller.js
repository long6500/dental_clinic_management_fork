const FunctionModel = require('./function');


const createFunction = async () => {
    try {
        if (await FunctionModel.find().count() > 0) return;

        const functions = [
            { name: "Quản lý nhân viên" },
            { name: "Quản lý người dùng" },
            { name: "Quản lý thuốc" },
            { name: "Quản lý dịch vụ" },
            { name: "Quản lý phiếu khám" },
            { name: "Quản lý lịch hẹn" },
        ];

        await FunctionModel.create(functions);
        return;
    } catch (err) {
        return err;
    }
}

const getFunction = async (req, res) => {
    const functions = await FunctionModel.find({});
    res.send({ success: 1, data: functions });
}

module.exports = {
    createFunction,
    getFunction,
}