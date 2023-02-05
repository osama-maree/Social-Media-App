const Joi = require("joi");

const posts = {
  body: Joi.object()
    .required()
    .keys({
      bodyPost: Joi.string().max(200).min(10).required(),
    }),
};
const updatposts = {
  body: Joi.object()
    .required()
    .keys({
      newBody: Joi.string().max(200).min(10).required(),
      postId: Joi.string().required(),
    }),
};
module.exports = {
  posts,
  updatposts,
};
