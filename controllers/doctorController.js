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
  router.get("/list", async (req, res) => {
    try {
      const { page, limit, fullName } = req.query;

      const result = await doctorService.getListOfApplicants(
        parseInt(page),
        parseInt(limit),

        // filter out special characters
        {
          fullName: fullName?.replace(
            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
            ""
          ),
        }
      );
      responseHandler.success(res, result, 200);
    } catch (error) {
      responseHandler.error(res, error, 500);
    }
  });
  router.get("/foods/:userId", async (req, res) => {
    try {
      console.log(req);
      const { userId } = req.params;
      console.log(req.query);

      const result = await doctorService.getFoods(userId);
      responseHandler.success(res, result, 200);
    } catch (error) {
      responseHandler.error(res, error, 500);
    }
  });
  router.get("/getApplicant/:applicantId", async (req, res) => {
    try {
      const { applicantId } = req.params;
      const result = await doctorService.getApplicant(ObjectId(applicantId));
      if (result) responseHandler.success(res, result);
      else responseHandler.error(res, { message: "Applicant not found" }, 204);
    } catch (error) {
      responseHandler.error(res, error, 500);
    }
  });
  router.put("/applicant", async (req, res) => {
    try {
      const { _id, ...data } = req.body || {};
      const result = await doctorService.editApplicant(ObjectId(_id), data);
      responseHandler.success(res, result);
    } catch (error) {
      responseHandler.error(res, error, 500);
    }
  });
  router.delete("/applicant", async (req, res) => {
    try {
      const result = await doctorService.deleteApplicant(
        ObjectId(req.body.applicantId)
      );
      responseHandler.success(res, result);
    } catch (error) {
      responseHandler.error(res, error, 500);
    }
  });

  return router;
};
