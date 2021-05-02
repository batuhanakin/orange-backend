const { celebrate } = require("celebrate");
const { ObjectId } = require("mongodb");
const responseHandler = require("../util/responseHandler.js");
const {
  NEW_VALIDATION,
  GET_VALIDATION,
} = require("../validations/doctorValidations");

module.exports = ({ userService, authService, doctorService }) => {
  const router = require("express").Router();
  router.post("/login", (req, res) => {
    const { userName, password } = req.body;
    return authService
      .authenticateDoctor({
        userName,
        password,
      })
      .then((result) => {
        if (result) {
          responseHandler.success(res, result);
        } else responseHandler.error(res, result, 401);
      })
      .catch((err) => responseHandler.error(res, err));
  });

  return router;
};
