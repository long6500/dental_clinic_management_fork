const mongoose = require("mongoose");

const MedicalTechSchema = new mongoose.Schema({
  medicalService: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "MedicalService",
  },
  techId: {
    type: String,
    require: true,
    ref: "Profile",
  },
  dateDoing: {
    type: Date,
    require: true,
  },
});

const MedicalTechModel = mongoose.model("Medical_Tech", MedicalTechSchema);

module.exports = MedicalTechModel;
