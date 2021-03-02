"use strict";

module.exports = (env) => {
  const defaults = {
    NODE_ENV: env.NODE_ENV || "development",

    PORT: 8080,
    accessControlAllowOrigin: "*",
    mongoDbConfig: {
      options: {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      url: "mongodb://localhost:27017/bitirme",
    },
  };

  return defaults;
};
