const { Joi } = require("celebrate");

const JString = Joi.string();
const MongoIdSchema = JString.regex(/^[0-9a-fA-F]{24}$/);

const NEW_VALIDATION = Joi.object().keys({
  email: Joi.string().email(),
  fullName: Joi.string(),
  password: Joi.string(),
});

const GET_VALIDATION = Joi.object().keys({
  userId: MongoIdSchema.required(),
});

module.exports = {
  NEW_VALIDATION,
  GET_VALIDATION,
};
