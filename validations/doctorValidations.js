const { Joi } = require("celebrate");

const JString = Joi.string();
const MongoIdSchema = JString.regex(/^[0-9a-fA-F]{24}$/);

const LOGIN_VALIDATION = Joi.object().keys({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

const GET_VALIDATION = Joi.object().keys({
  userId: MongoIdSchema.required(),
});

module.exports = {
  LOGIN_VALIDATION,
  GET_VALIDATION,
};
