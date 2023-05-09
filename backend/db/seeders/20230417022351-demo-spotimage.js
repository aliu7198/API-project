"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "image/kamadofamilyhome",
        preview: true,
      },
      {
        spotId: 2,
        url: "image/zenitsuapartment",
        preview: true,
      },
      {
        spotId: 3,
        url: "image/inosukecave",
        preview: true,
      },
      {
        spotId: 4,
        url: "image/tomiokafamilydojo",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://media.discordapp.net/attachments/1090663657639268482/1105503300914249768/1f3c302c_original.png?width=1007&height=671",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://media.discordapp.net/attachments/1090663657639268482/1105503302214500443/ac66adb5_original.png?width=1007&height=671",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://media.discordapp.net/attachments/1090663657639268482/1105503301396607156/86ce563e_original.png",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://media.discordapp.net/attachments/1105503304521363587/1105514966922055803/00fdc1f2-9c96-4463-8103-e17c44668589.png",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://media.discordapp.net/attachments/1090663657639268482/1105503304085143682/3695eaec_original.png?width=1007&height=671",
        preview: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4, 5] },
      },
      {}
    );
  },
};
