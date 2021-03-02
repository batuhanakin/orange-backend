const sessionSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["userId", "sessionToken"],
    properties: {
      userId: {
        bsonType: "objectId",
        description: "required",
      },
      sessionToken: {
        bsonType: "string",
        description: "required",
      },
    },
  },
};

module.exports = { sessionSchema };
