'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Tanjiro',
        lastName: 'Kamado',
        email: 'tanjirou.kamado@demonslayercorps.io',
        username: 'ChildOfBrightness714',
        hashedPassword: bcrypt.hashSync('HinokamiKagura1')
      },
      {
        firstName: 'Zenitsu',
        lastName: 'Agatsuma',
        email: 'zenitsu.agatsuma@demonslayercorps.io',
        username: 'ThunderStruck_09',
        hashedPassword: bcrypt.hashSync('sleepyboi3')
      },
      {
        firstName: 'Inosuke',
        lastName: 'Hashibira',
        email: 'inosuke.hashibira@demonslayercorps.io',
        username: 'BoarKing_123',
        hashedPassword: bcrypt.hashSync('bb3devour')
      },
      {
        firstName: 'Giyuu',
        lastName: 'Tomioka',
        email: 'giyuu.tomioka@demonslayercorps.io',
        username: 'WaterHashira11',
        hashedPassword: bcrypt.hashSync('CalmWater5')
      },
      {
        firstName: 'Shinobu',
        lastName: 'Kocho',
        email: 'shinobu.kocho@demonslayercorps.io',
        username: 'InsectPillar10',
        hashedPassword: bcrypt.hashSync('poisonbutterfly6')
      },
      {
        firstName: 'Sakonji',
        lastName: 'Urokodaki',
        email: 'sakonji.urokodaki@demonslayercorps.io',
        username: 'OldMountainHermit',
        hashedPassword: bcrypt.hashSync('waterbreathing10')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['ChildOfBrightness714', 'ExplodingBlood2', 'ThunderStruck_09', 'BoarKing_123', 'WaterHashira11'] }
    }, {});
  }
};
