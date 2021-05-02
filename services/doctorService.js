const crypto = require("crypto-js/");
module.exports = ({
  userCollection,
  doctorCollection,
  authService,
  userService,
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
  };
};
