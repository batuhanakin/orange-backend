"use strict";
const { MongoClient } = require("mongodb");
const { userSchema } = require("../models/user");
const { sessionSchema } = require("../models/session");

module.exports = async (config) => {
  const mongoDbConnection = await MongoClient.connect(
    config.mongoDbConfig.url,
    config.mongoDbConfig.options
  );
  const mongoDb = mongoDbConnection.db();

  const userCollection = await ensureCollection(mongoDb, "users", {
    validator: userSchema,
  });
  const sessionCollection = await ensureCollection(mongoDb, "sessions", {
    validator: sessionSchema,
  });
  const userService = require("../services/userService")({
    userCollection,
  });
  const authService = require("../services/authService")({
    userCollection,
    userService,
    sessionCollection,
  });
  return {
    config,
    mongoDbConnection,
    userService,
    authService,
  };
};

function ensureCollection(db, collectionName, options) {
  return db.createCollection(collectionName, options).catch((err) => {
    if (err.code !== 48) throw err;
    return db.collection(collectionName);
  });
}
