var dayjs = require("dayjs");
module.exports = ({ foodCollection }) => {
  return {
    async createFood({
      userId,
      date,
      breakfast,
      firstSnack,
      lunch,
      secondSnack,
      dinner,
      thirdSnack,
    }) {
      const isFood = await foodCollection.findOne({
        userId,
        date,
      });
      if (isFood?._id) {
        const updatedFood = await foodCollection.findOneAndUpdate(
          { userId: userId, date: date },
          {
            $set: {
              userId,
              date,
              breakfast,
              firstSnack,
              lunch,
              secondSnack,
              dinner,
              thirdSnack,
              isDeleted: false,
              updated_at: new Date(),
            },
          }
        );
        return updatedFood.value;
      } else {
        const food = await foodCollection.insertOne({
          userId,
          date,
          breakfast,
          firstSnack,
          lunch,
          secondSnack,
          dinner,
          thirdSnack,
          isDeleted: false,
          created_at: new Date(),
        });
        return food.ops[0];
      }
    },
    async getFood({ userId, date }) {
      const food = await foodCollection.findOne({ userId, date });
      console.log(food);
      if (food) {
        delete food.isDeleted;
        return food;
      }
      throw { message: "not found food", status: 300 };
    },
  };
};
