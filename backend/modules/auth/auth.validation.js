const Joi = require('joi');

const forgotSchema = Joi.object({
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().alphanum().min(8).required()
});

const changeSchema = Joi.object({
  password: Joi.string().required(),
  newPassword: Joi.string().alphanum().min(8).required(),
  confirmPassword: Joi.string().alphanum().min(8).equal(Joi.ref('newPassword')).required(),
});

module.exports = {
  forgotSchema,
  loginSchema,
  changeSchema
}