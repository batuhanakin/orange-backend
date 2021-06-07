"use strict";
const { MongoClient } = require("mongodb");
const { userSchema } = require("../models/user");
const { doctorSchema } = require("../models/doctor");
const { sessionSchema } = require("../models/session");
const { foodSchema } = require("../models/foods");

module.exports = async (config) => {
  const mongoDbConnection = await MongoClient.connect(
    config.mongoDbConfig.url,
    config.mongoDbConfig.options
  );
  const mongoDb = mongoDbConnection.db();

  const userCollection = await ensureCollection(mongoDb, "users", {
    validator: userSchema,
  });
  const foodCollection = await ensureCollection(mongoDb, "foods", {
    validator: foodSchema,
  });
  const doctorCollection = await ensureCollection(mongoDb, "doctor", {
    validator: doctorSchema,
  });
  const sessionCollection = await ensureCollection(mongoDb, "sessions", {
    validator: sessionSchema,
  });
  const userService = require("../services/userService")({
    userCollection,
  });
  const foodService = require("../services/foodService")({
    foodCollection,
  });
  const authService = require("../services/authService")({
    userCollection,
    userService,
    sessionCollection,
    doctorCollection,
  });
  const doctorService = require("../services/doctorService")({
    userCollection,
    doctorCollection,
    userService,
    authService,
    foodCollection,
  });
  return {
    config,
    mongoDbConnection,
    userService,
    authService,
    doctorService,
    foodService,
  };
};

function ensureCollection(db, collectionName, options) {
  return db.createCollection(collectionName, options).catch((err) => {
    if (err.code !== 48) throw err;
    return db.collection(collectionName);
  });
}
