const { celebrate } = require("celebrate");
const { ObjectId } = require("mongodb");
const responseHandler = require("../util/responseHandler.js");

module.exports = ({ foodService }) => {
  const router = require("express").Router();

  router.post("/create", (req, res) => {
    const {
      userId,
      date,
      breakfast,
      firstSnack,
      lunch,
      secondSnack,
      dinner,
      thirdSnack,
    } = req.body;

    return foodService
      .createFood({
        userId,
        date,
        breakfast,
        firstSnack,
        lunch,
        secondSnack,
        dinner,
        thirdSnack,
      })
      .then((result) => {
        if (result) {
          responseHandler.success(res, result);
        } else responseHandler.error(res, result, 401);
      })
      .catch((err) => responseHandler.error(res, err));
  });

  router.post("/selected", async (req, res) => {
    const { userId, date } = req.body;
    return foodService
      .getFood({
        userId,
        date,
      })
      .then((result) => {
        responseHandler.success(res, result);
      })
      .catch((err) => {
        responseHandler.error(res, err, err.status);
      });
  });

  router.get("/:userId", (req, res) => {
    const { userId } = req.params;
    return userService
      .getUser({
        userId: ObjectId(userId),
      })
      .then((result) => {
        responseHandler.success(res, result);
      })
      .catch((err) => responseHandler.error(res, err, 200));
  });

  return router;
};
