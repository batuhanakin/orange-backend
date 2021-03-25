const crypto = require("crypto-js/");
module.exports = ({ userCollection }) => {
  return {
    async createUser({ email, password, fullName }) {
      const hash = this.hashPassword(password);
      const user = await userCollection.insertOne({
        fullName,
        email,
        hash,
      });
      delete user.ops[0].hash;
      return user.ops[0];
    },
    hashPassword(password) {
      const hash = crypto.MD5(password).toString();
      return hash;
    },

    async getUser({ userId }) {
      const foundUser = await userCollection.findOne({
        _id: userId,
        isDeleted: false,
      });
      if (foundUser) {
        const { hash, ...user } = foundUser || {};
        return user;
      }
      return { username: "test" };
    },
  };
};
