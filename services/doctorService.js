const crypto = require("crypto-js/");
module.exports = ({
  userCollection,
  doctorCollection,
  authService,
  userService,
  foodCollection,
}) => {
  return {
    async createUser({ userName, password }) {
      const hash = userService.hashPassword(password);
      const doctor = await doctorCollection.insertOne({
        userName,
        hash,
      });
      delete doctor.ops[0].hash;
      return doctor.ops[0];
    },

    async getUser({ userId }) {
      const foundUser = await userCollection.findOne({
        _id: userId,
      });
      if (foundUser) {
        const { hash, ...user } = foundUser || {};
        return user;
      } else {
        return "not found user";
      }
    },
    async getListOfApplicants(page, limit, search) {
      const searchObj = {};
      if (search.fullName)
        searchObj["fullName"] = new RegExp(search.fullName, "i");

      const cursor = await userCollection.find({
        // isDeleted: false,
        ...searchObj,
      });
      const list = await cursor
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();
      const total = await cursor.count();
      return { list: list, total: total };
    },
    async getFoods(userId) {
      const cursor = await foodCollection.find({
        userId,
      });
      const list = await cursor.toArray();
      return { foodList: list };
    },
    async getApplicant(objectId) {
      const found = await userCollection.findOne({
        _id: objectId,
      });
      return found;
    },
    async editApplicant(objectId, object) {
      const applicant = await userCollection.findOneAndReplace(
        { _id: objectId },
        object
      );
      return applicant;
    },
    async deleteApplicant(objectId) {
      const applicant = await userCollection.remove({ _id: objectId });

      return applicant.result;
    },
  };
};
