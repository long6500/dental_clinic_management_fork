const Joi = require('joi');

const CustomerSchema = Joi.object({
  fullname: Joi.string().required(),
  phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  email: Joi.string().email().required(),
  dateOfBirth: Joi.date(),
  gender: Joi.number().integer().valid(0,  1, 2),
  job: Joi.string(),
  bloodGroup: Joi.string().valid(),
  address: Joi.string(),
  note: Joi.string(),
  status: Joi.boolean(),
});

module.exports = CustomerSchema