const express = require("express");
const bodyParser = require("body-parser");
const responseHandler = require("../util/responseHandler.js");

module.exports = (appContext) => {
  const {
    config: { PORT, accessControlAllowOrigin },
    userService,
    authService,
  } = appContext;
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(bodyParser.json());

  app.use(require("./httpServer.cors")(accessControlAllowOrigin));

  app.use(
    "/api/user",
    require("../controllers/userController")({ userService, authService })
  );

  app.use((err, req, res, next) => {
    if (!err) next();
    responseHandler.error(res, err);
  });

  app.use((req, res) => {
    responseHandler.error(res, null, 404);
  });

  return new Promise((resolve) => {
    const httpServer = app.listen(PORT, () => {
      console.log("Server started on port: " + PORT);
      resolve({ httpServer, app });
    });
  });
};
