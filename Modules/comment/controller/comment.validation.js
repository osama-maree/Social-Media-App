const Joi = require("joi");

const createcomment = {
  body: Joi.object()
    .required()
    .keys({
      comment: Joi.string().max(200).min(5).required(),
      PostId: Joi.string().required(),
    }),
};

const udated = {
  body: Joi.object()
    .required()
    .keys({
      newcomment: Joi.string().max(200).min(5).required(),
      PostId: Joi.string().required(),
    }),
};
module.exports = {
  createcomment,
  udated
};
