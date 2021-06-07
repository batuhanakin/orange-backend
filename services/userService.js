const crypto = require("crypto-js/");
module.exports = ({ userCollection }) => {
  return {
    async createUser({
      email,
      password,
      fullName,
      height,
      firstWeight,
      age,
      phone,
    }) {
      const hash = this.hashPassword(password);
      const user = await userCollection.insertOne({
        fullName,
        email,
        hash,
        height,
        firstWeight,
        age,
        phone,
        isDeleted: false,
      });
      delete user.ops[0].hash;
      return user.ops[0];
    },

    async updateUser({ kilo, userId }) {
      console.log(kilo, userId);
      const user = await userCollection.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            kilos: kilo,
          },
        }
      );
      console.log(user);
      // delete user.ops[0].hash;
      return user;
    },
    hashPassword(password) {
      const hash = crypto.MD5(password).toString();
      return hash;
    },
    async getUserList() {
      return userCollection.getUsers();
    },
    async getUserCount() {
      return userCollection.count();
    },

    async getUser({ userId }) {
      const foundUser = await userCollection.findOne({
        _id: userId,
      });
      console.log(foundUser);
      if (foundUser) {
        const { hash, ...user } = foundUser || {};
        return user;
      } else {
        return "not found user";
      }
    },
  };
};
