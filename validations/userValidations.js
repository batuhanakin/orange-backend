const { Joi } = require("celebrate");

const JString = Joi.string();
const JStringRequired = JString.required();
const MongoIdSchema = JString.regex(/^[0-9a-fA-F]{24}$/);

const NEW_VALIDATION = Joi.object().keys({
  fullName: JStringRequired.min(3),
  password: JStringRequired,
});

const GET_VALIDATION = Joi.object().keys({
  userId: MongoIdSchema.required(),
});

module.exports = {
  NEW_VALIDATION,
  GET_VALIDATION,
};
