"use strict";
const config = require("../config/config")(process.env.NODE_ENV || process.env);
const appContextPromise = require("../config/appContext.js")(config);

module.exports = appContextPromise.then(async (appContext) => {
  const { mongoDbConnection, doctorService } = appContext;
  await doctorService.createUser({
    userName: "admin",
    password: "12345",
  });
  await mongoDbConnection.close();
});
