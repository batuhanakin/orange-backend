const userSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["email", "hash"],
    properties: {
      email: {
        bsonType: "string",
        description: "required",
      },
      hash: {
        bsonType: "string",
        description: "required",
      },
      fullName: {
        bsonType: "string",
      },
      isDeleted: {
        bsonType: "bool",
      },
    },
  },
};

module.exports = { userSchema };
