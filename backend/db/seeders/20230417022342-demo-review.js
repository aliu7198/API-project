'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 4,
        review: `This is a charming little house that offers a glimpse into life in the countryside. The location is great, with plenty of beautiful scenery in the surrounding mountains. Unfortunately it is also where Tanjiro's family met their untimely demise.`,
        stars: 3,
      },
      {
        spotId: 2,
        userId: 3,
        review: 'AHHHHHH TOO MANY PEOPLE AND LIGHTS AND SOUNDS',
        stars: 1,
      },
      {
        spotId: 3,
        userId: 2,
        review: `Literally a cave. I don't know what I expected but I want to go home, this is scary!`,
        stars: 1,
      },
      {
        spotId: 4,
        userId: 1,
        review: `The dojo is spacious and well-equipped, with plenty of room for both individual and group training. Overall, I would highly recommend this location to anyone looking to improve their Water Breathing skills.`,
        stars: 5,
      },
      {
        spotId: 5,
        userId: 1,
        review: `The grounds of the mansion are immaculately maintained, with lush gardens that create a peaceful and relaxing atmosphere. The staff is incredibly attentive and accommodating, making sure that every need is met as we recover and train for the next mission.`,
        stars: 5,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
