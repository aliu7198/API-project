'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'image/kamadofamilyhome',
        preview: true
        },
        {
        spotId: 2,
        url: 'image/zenitsuapartment',
        preview: true
        },
        {
        spotId: 3,
        url: 'image/inosukecave',
        preview: true
        },
        {
        spotId: 4,
        url: 'image/tomiokafamilydojo',
        preview: true
        },
        {
        spotId: 5,
        url: 'https://i.imgur.com/f2mTbVR.png',
        preview: true
        }
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
