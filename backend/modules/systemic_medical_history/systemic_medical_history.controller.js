const SystemicMedicalHistoryModel = require('./systemic_medical_history');


const createSystemicMedicalHistory = async () => {
    try {
        if (await SystemicMedicalHistoryModel.find().count() > 0) return;

        const systemicMedicalHistory = [
            { name: "Khớp thái dương hàm" },
            { name: "Đã từng nhổ răng" },
            { name: "Đã từng chỉnh nha" },
            { name: "Đã từng đeo hàm" },
            { name: "Khác" },
        ];

        await SystemicMedicalHistoryModel.create(systemicMedicalHistory);
        return;
    } catch (err) {
        return err;
    }
}

const getSystemicMedicalHistory = async (req, res) => {
    const systemicMedicalHistories= await SystemicMedicalHistoryModel.find({});
    res.send({ success: 1, data: systemicMedicalHistories });
}

module.exports = {
    createSystemicMedicalHistory,
    getSystemicMedicalHistory,
}