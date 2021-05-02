const doctorSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["userName", "hash"],
    properties: {
      userName: {
        bsonType: "string",
        description: "required",
      },
      hash: {
        bsonType: "string",
        description: "required",
      },
    },
  },
};

module.exports = { doctorSchema };
