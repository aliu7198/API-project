'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'image/kamadofamilyhome'
        },
        {
        reviewId: 2,
        url: 'image/zenitsuapartment'
        },
        {
        reviewId: 3,
        url: 'image/inosukecave'
        },
        {
        reviewId: 4,
        url: 'image/tomiokafamilydojo'
        },
        {
        reviewId: 5,
        url: 'image/butterflymansion'
        }
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
