const { Joi } = require("celebrate");

const JString = Joi.string();
const MongoIdSchema = JString.regex(/^[0-9a-fA-F]{24}$/);

const NEW_VALIDATION = Joi.object().keys({
  email: Joi.string().email().required(),
  fullName: Joi.string().required(),
  password: Joi.string().required(),
  height: Joi.number().required(),
  age: Joi.number().required(),
  phone: Joi.number().required(),
  firstWeight: Joi.number().required(),
});

const GET_VALIDATION = Joi.object().keys({
  userId: MongoIdSchema.required(),
});

module.exports = {
  NEW_VALIDATION,
  GET_VALIDATION,
};
