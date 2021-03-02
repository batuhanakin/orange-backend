const express = require("express");

module.exports = (accessControlAllowOrigin) => {
  const app = express();
  app.use((req, res, next) => {
    if (accessControlAllowOrigin) {
      res.header("Access-Control-Allow-Origin", accessControlAllowOrigin);
    }
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if ("OPTIONS" === req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  return app;
};
