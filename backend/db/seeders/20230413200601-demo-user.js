"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        // 1
        {
          firstName: "Tanjiro",
          lastName: "Kamado",
          email: "tanjirou.kamado@demonslayercorps.io",
          username: "ChildOfBrightness714",
          hashedPassword: bcrypt.hashSync("HinokamiKagura1"),
        },
        // 2
        {
          firstName: "Zenitsu",
          lastName: "Agatsuma",
          email: "zenitsu.agatsuma@demonslayercorps.io",
          username: "ThunderStruck_09",
          hashedPassword: bcrypt.hashSync("sleepyboi3"),
        },
        // 3
        {
          firstName: "Inosuke",
          lastName: "Hashibira",
          email: "inosuke.hashibira@demonslayercorps.io",
          username: "BoarKing_123",
          hashedPassword: bcrypt.hashSync("bb3devour"),
        },
        // 4
        {
          firstName: "Giyuu",
          lastName: "Tomioka",
          email: "giyuu.tomioka@demonslayercorps.io",
          username: "WaterHashira11",
          hashedPassword: bcrypt.hashSync("CalmWater5"),
        },
        // 5
        {
          firstName: "Shinobu",
          lastName: "Kocho",
          email: "shinobu.kocho@demonslayercorps.io",
          username: "InsectPillar10",
          hashedPassword: bcrypt.hashSync("poisonbutterfly6"),
        },
        // 6
        {
          firstName: "Sakonji",
          lastName: "Urokodaki",
          email: "sakonji.urokodaki@demonslayercorps.io",
          username: "OldMountainHermit",
          hashedPassword: bcrypt.hashSync("waterbreathing10"),
        },
        // 7
        {
          firstName: "Muzan",
          lastName: "Kibutsuji",
          email: "muzan.kibutsuji@demons.io",
          username: "KingofDemons",
          hashedPassword: bcrypt.hashSync("bloodmoon666"),
        },
        // 8
        {
          firstName: "Howl",
          lastName: "Jenkins",
          email: "howl.jenkins@ghibli.io",
          username: "WizardOfTheWastes",
          hashedPassword: bcrypt.hashSync("fireandstars"),
        },
        // 9
        {
          firstName: "Sophie",
          lastName: "Hatter",
          email: "sophie.hatter@ghibli.io",
          username: "WalkingFortune",
          hashedPassword: bcrypt.hashSync("strongwill123"),
        },
        // 10
        {
          firstName: "Spike",
          lastName: "Spiegel",
          email: "spike.spiegel@bebop.io",
          username: "SpaceCowboy",
          hashedPassword: bcrypt.hashSync("bebop123"),
        },
        // 11
        {
          firstName: "Jet",
          lastName: "Black",
          email: "jet.black@bebop.io",
          username: "IronHand",
          hashedPassword: bcrypt.hashSync("bebop321"),
        },
        // 12
        {
          firstName: "Faye",
          lastName: "Valentine",
          email: "faye.valentine@bebop.io",
          username: "SpaceVixen",
          hashedPassword: bcrypt.hashSync("redtail456"),
        },
        // 13
        {
          firstName: "Enmu",
          lastName: "Tamio",
          email: "enmu.L1@demons.io",
          username: "DreamDemon",
          hashedPassword: bcrypt.hashSync('mugenmoon1'),
        },
        // 14
        {
          firstName: "Nezuko",
          lastName: "Kamado",
          email: "nezuko.kamado@demonslayercorps.io",
          username: "D3monGrrl666",
          hashedPassword: bcrypt.hashSync('explodingblood'),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            "ChildOfBrightness714",
            "ExplodingBlood2",
            "ThunderStruck_09",
            "BoarKing_123",
            "WaterHashira11",
          ],
        },
      },
      {}
    );
  },
};
