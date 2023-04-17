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
        url: 'image/kamadofamilyhome'
        },
        {
        spotId: 2,
        url: 'image/zenitsuapartment'
        },
        {
        spotId: 3,
        url: 'image/inosukecave'
        },
        {
        spotId: 4,
        url: 'image/tomiokafamilydojo'
        },
        {
        spotId: 5,
        url: 'image/butterflymansion'
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
