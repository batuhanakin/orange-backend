const { v4: uuidv4 } = require("uuid");

module.exports = ({
  userCollection,
  userService,
  sessionCollection,
  doctorCollection,
}) => {
  return {
    async checkPassWord(userPassword, password) {
      const hashPassword = await userService.hashPassword(password);
      if (userPassword == hashPassword) {
        return true;
      } else return false;
    },
    async authenticateUser({ email, password }) {
      const user = await userCollection.findOne({ email });
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
    async authenticateDoctor({ userName, password }) {
      const admin = await doctorCollection.findOne({ userName });
      if (admin) {
        const isPasswordMatch = await this.checkPassWord(admin.hash, password);
        if (isPasswordMatch) {
          const sessionToken = await this.createDoctorSession(admin._id);
          delete admin.hash;
          return { authenticated: true, admin, sessionToken };
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
    async createDoctorSession(userId) {
      const sessionToken = uuidv4();
      try {
        const session = await doctorCollection.insertOne({
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
