const Joi = require('joi');

const profileSchema = Joi.object({
  fullname: Joi.string().required(),
  phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  email: Joi.string().email().required(),
  address: Joi.string().min(3).max(30),
  status: Joi.boolean(),
  workingDays: Joi.number().integer().required(),
  salary: Joi.number().required(),
  schedule: Joi.array().items(Joi.object()).required(),
});

module.exports = profileSchema