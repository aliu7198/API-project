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
        review: `The Kamado Family Home is a charming little house that offers a glimpse into life in the countryside. The location is great, with easy access to the nearby town and plenty of beautiful scenery in the surrounding mountains. The only downside is that the house has a sad history, as it is where Tanjiro's family met their untimely demise.`,
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
        review: `Literally a cave. I don't know what I expected but I want to go home.`,
        stars: 1,
      },
      {
        spotId: 4,
        userId: 1,
        review: `The Tomioka Family Dojo is a great choice for anyone interested in learning more about the Water Breathing techniques. The dojo is spacious and well-equipped, with plenty of room for both individual and group training. Additionally, the location is great, with easy access to the nearby town and plenty of beautiful scenery in the surrounding area. Overall, I would highly recommend this location to anyone looking to improve their Water Breathing skills.`,
        stars: 5,
      },
      {
        spotId: 5,
        userId: 1,
        review: `If you're looking for an exquisite and luxurious experience, the Butterfly Mansion is the perfect choice. This stunning mansion is beautifully decorated with traditional Japanese architecture and modern amenities, making it a perfect blend of old and new. The rooms are spacious and comfortable, with plush bedding and high-end furnishings that make you feel like royalty. The grounds of the mansion are immaculately maintained, with lush gardens and serene water features that create a peaceful and relaxing atmosphere. Additionally, the staff is incredibly attentive and accommodating, making sure that every need is met and every desire is fulfilled. Whether you're recovering from a mission or training for the next one, the Butterfly Mansion is the perfect place to be. I cannot recommend this stunning property enough.`,
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
