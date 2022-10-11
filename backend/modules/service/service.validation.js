const Joi = require('joi');

const serviceSchema = Joi.object({
  name: Joi.string().required(),
  imageUrl: Joi.string().min(8).required(),
  time: Joi.date().required(),
  price: Joi.number().required(),
  note: Joi.string(),
  status: Joi.boolean().required(),
});

module.exports = serviceSchema