const { v4: uuidv4 } = require("uuid");

module.exports = ({ userCollection, userService, sessionCollection }) => {
  return {
    async checkPassWord(userPassword, password) {
      const hashPassword = await userService.hashPassword(password);
      if (userPassword == hashPassword) {
        return true;
      } else return false;
    },
    async authenticateUser({ username, password }) {
      const user = await userCollection.findOne({ username });
      if (user) {
        const isPasswordMatch = await this.checkPassWord(user.hash, password);
        if (isPasswordMatch) {
          const sessionToken = await this.createSession(user._id);
          delete user.hash;
          return { authenticated: true, user, sessionToken };
        }
      }
      return false;
    },
    async createSession(userId) {
      const sessionToken = uuidv4();
      try {
        const session = await sessionCollection.insertOne({
          userId,
          sessionToken,
        });
        return session.ops[0].sessionToken;
      } catch (err) {
        console.log("err: sesssion", err);
      }
    },
  };
};
