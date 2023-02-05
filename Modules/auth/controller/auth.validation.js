const Joi = require("joi");
//i use Joi library to check validation it is easy
//Joi provides a simple and expressive syntax for defining validation rules for data, such as strings, numbers, arrays, and objects.
//provides a powerful and flexible tool for validating data in Node.js applications, helping ensure that incoming data meets the required format and constraints.
const signUpv = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(3).max(15).required().messages({
        "any.required": "pleaze send name",
        "string.empty": "name is required",
      }),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).max(20).required(),
      age: Joi.number(),
      profilePic: Joi.string(),
      gender: Joi.string(),
    }),
};
const signin = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().email().required().messages({
        "any.required": "email. is required",//to change text error as i want
      }),
      password: Joi.string().required(),
    }),
};
const send1 = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().email().required().messages({
        "any.required": "email. is required",
      }),
    }),
};

const forgetPassword = {
  body: Joi.object().required().keys({
    code: Joi.string().required(),
    email: Joi.string().email().required(),
    newPassword: Joi.string().required(),
  }),
};
module.exports = {
  signUpv,
  signin,
  send1,
  forgetPassword,
};
