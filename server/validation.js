const joi = require('@hapi/joi');

// REGISTER VALIDATION
const registerValidation = (data) => {
  const schema = joi.object({
    name: joi.string().required(),
    lastname: joi.string().required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
};
// LOGIN VALIDATION
const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
