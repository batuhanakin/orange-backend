const userSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["username", "hash"],
    properties: {
      username: {
        bsonType: "string",
        description: "required",
      },
      hash: {
        bsonType: "string",
        description: "required",
      },
      isDeleted: {
        bsonType: "bool",
      },
    },
  },
};

module.exports = { userSchema };
