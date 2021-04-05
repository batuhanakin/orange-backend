const { celebrate } = require("celebrate");
const { ObjectId } = require("mongodb");
const responseHandler = require("../util/responseHandler.js");
const {
  NEW_VALIDATION,
  GET_VALIDATION,
} = require("../validations/userValidations");

module.exports = ({ userService, authService }) => {
  const router = require("express").Router();
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    return authService
      .authenticateUser({
        email,
        password,
      })
      .then((result) => {
        if (result) {
          responseHandler.success(res, result);
        } else responseHandler.error(res, result, 401);
      })
      .catch((err) => responseHandler.error(res, err));
  });

  router.post(
    "/signup",
    celebrate({ body: NEW_VALIDATION }, { abortEarly: false }),
    (req, res) => {
      const { fullName, email, password, height, firstWeight, age } = req.body;
      return userService
        .createUser({
          fullName,
          email,
          password,
          height,
          firstWeight,
          age,
        })
        .then((result) => {
          responseHandler.success(res, result);
        })
        .catch((err) => responseHandler.error(res, err, 200));
    }
  );

  router.get(
    "/:userId",
    celebrate({ params: GET_VALIDATION }, { abortEarly: false }),
    (req, res) => {
      const { userId } = req.params;
      return userService
        .getUser({
          userId: ObjectId(userId),
        })
        .then((result) => {
          responseHandler.success(res, result);
        })
        .catch((err) => responseHandler.error(res, err, 200));
    }
  );

  return router;
};
