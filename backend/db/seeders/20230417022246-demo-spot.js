'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '14 Flower Street',
        city: 'Okutama',
        state: 'Tokyo',
        country: 'Japan',
        lat: 35.689487,
        lng: 139.691711,
        name: 'Kamado Family Home',
        description: 'The quaint home of the Kamado family, where Tanjiro and Nezuko grew up.',
        price: 100
        },
        {
        ownerId: 2,
        address: '36 Foxfire Lane',
        city: 'Shinjuku',
        state: 'Tokyo',
        country: 'Japan',
        lat: 35.710063,
        lng: 139.810700,
        name: 'Zenitsu\'s Apartment',
        description: 'The small and cozy apartment of Zenitsu, located in the heart of the city with a variety of fun museums, parks, and nightlife spots around.',
        price: 120
        },
        {
        ownerId: 3,
        address: '22 Boar\'s Nest',
        city: 'Okutama',
        state: 'Tokyo',
        country: 'Japan',
        lat: 35.694329,
        lng: 139.767226,
        name: 'Inosuke\'s Cave',
        description: 'The wild and rustic home of Inosuke and his boar family, situated deep in the forest.',
        price: 90
        },
        {
        ownerId: 4,
        address: '10 Waterfall Way',
        city: 'Nakano',
        state: 'Tokyo',
        country: 'Japan',
        lat: 35.689469,
        lng: 139.700540,
        name: 'Tomioka Family Dojo',
        description: 'The training grounds of the Tomioka family, famous for their Water Breathing techniques.',
        price: 120
        },
        {
        ownerId: 5,
        address: '7 Butterfly Avenue',
        city: 'Takinogawa',
        state: 'Tokyo',
        country: 'Japan',
        lat: 35.703858,
        lng: 139.735181,
        name: 'Butterfly Mansion',
        description: 'The grand estate of the Kocho family, known for their expertise in poison.',
        price: 150
        }
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Kamado Family Home', 'Zenitsu\'s Apartment', 'Tomioka Family Dojo', 'Butterfly Mansion'] }
    });
  }
};
