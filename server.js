"use strict";
const config = require("./config/config.js")(process.env.NODE_ENV, process.env);
const appContextPromise = require("./config/appContext.js")(config);
const httpServerFactory = require("./config/httpServer.js");

module.exports = appContextPromise.then(async (appContext) => {
  const { app, httpServer } = await httpServerFactory(appContext);
  return { app, appContext, httpServer };
});
