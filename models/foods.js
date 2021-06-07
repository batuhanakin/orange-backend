const foodsSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: [],
    properties: {
      userId: {
        bsonType: "objectId",
      },
      date: {
        bsonType: "string",
      },
      breakfast: {
        bsonType: "string",
      },
      firstSnack: {
        bsonType: "string",
      },
      lunch: {
        bsonType: "int",
      },
      secondSnack: {
        bsonType: "string",
      },
      dinner: {
        bsonType: "string",
      },
      thirdSnack: {
        bsonType: "string",
      },
      created_at: {
        bsonType: "date",
      },
      updated_at: {
        bsonType: "date",
      },
      isDeleted: {
        bsonType: "bool",
      },
    },
  },
};

module.exports = { foodsSchema };
