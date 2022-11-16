const Joi = require('joi');

const CustomerSchema = Joi.object({
  fullname: Joi.string().required(),
  phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  email: Joi.string().email().optional().allow(""),
  dateOfBirth: Joi.date(),
  gender: Joi.number().integer().valid(0,  1, 2),
  job: Joi.string().allow(""),
  bloodGroup: Joi.string().valid(),
  address: Joi.string().allow(""),
  note: Joi.string().allow(""),
  status: Joi.boolean(),
  systemicMedicalHistory: Joi.array(),
  dentalMedicalHistory: Joi.array(),
});

module.exports = CustomerSchema