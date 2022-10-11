const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().alphanum().min(8).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().alphanum().min(8).required()
});

module.exports = {
  registerSchema,
  loginSchema
}