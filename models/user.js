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
      height: {
        bsonType: "string",
      },
      age: {
        bsonType: "int",
      },
      firstWeight: {
        bsonType: "string",
      },
      kilos: {
        bsonType: "array",
      },
      phone: {
        bsonType: "string",
      },
      isDeleted: {
        bsonType: "bool",
      },
    },
  },
};

module.exports = { userSchema };
