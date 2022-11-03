const { object } = require('joi');
const Joi = require('joi');

const serviceSchema = Joi.object({
  name: Joi.string().required(),
  time: Joi.number().integer().required(),
  price: Joi.number().required(),
  note: Joi.string(),
  status: Joi.boolean(),
  consumable: Joi.array().items(Joi.object()),
  prescription: Joi.array().items(Joi.object()),
});

module.exports = serviceSchema