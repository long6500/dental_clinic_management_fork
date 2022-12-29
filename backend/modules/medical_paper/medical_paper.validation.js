const Joi = require("joi");

const MedicalPaperSchema = Joi.object({
  customerId: Joi.string().required(),
  doctorId: Joi.string().required(),
  reExamination: Joi.date().allow(null, ""),
  status: Joi.number().integer(),
  note: Joi.string().allow(null, ""),
  totalAmount: Joi.number(),
  customerPayment: Joi.number(),
});

const UpdateMedicalPaperSchema = Joi.object({
  customerId: Joi.string().required(),
  doctorId: Joi.string().required(),
  reExamination: Joi.date().allow(null, ""),
  status: Joi.number().integer(),
  note: Joi.string().allow(null, ""),
  predic: Joi.string().required(),
  totalAmount: Joi.number(),
  customerPayment: Joi.number(),
});

module.exports = { MedicalPaperSchema, UpdateMedicalPaperSchema };
