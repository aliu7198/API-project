'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 4,
        startDate: '2024-02-21',
        endDate: '2024-02-22',
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2024-04-14',
        endDate: '2024-04-25',
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2024-02-13',
        endDate: '2024-02-18',
      },
      {
        spotId: 5,
        userId: 1,
        startDate: '2024-05-01',
        endDate: '2024-05-31',
      },
      {
        spotId: 6,
        userId: 1,
        startDate: '2023-03-10',
        endDate: '2023-04-20',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
