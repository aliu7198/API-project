"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(options, [
      // 1
      {
        ownerId: 1,
        address: "14 Flower Street",
        city: "Okutama",
        state: "Tokyo",
        country: "Japan",
        lat: 35.689487,
        lng: 139.691711,
        name: "Kamado Family Home",
        description:
          "A quaint and secluded home in the mountains, just a day's walk away from the nearby town.",
        price: 80,
      },
      // 2
      {
        ownerId: 2,
        address: "36 Foxfire Lane",
        city: "Shinjuku",
        state: "Tokyo",
        country: "Japan",
        lat: 35.710063,
        lng: 139.8107,
        name: "Zenitsu's Apartment",
        description:
          "A small and cozy apartment located in the heart of Tokyo with a variety of fun museums, parks, and nightlife spots around.",
        price: 120,
      },
      // 3
      {
        ownerId: 3,
        address: "22 Boar's Nest",
        city: "Okutama",
        state: "Tokyo",
        country: "Japan",
        lat: 35.694329,
        lng: 139.767226,
        name: "Inosuke's Cave",
        description:
          "A wild and rustic cave situated deep in the forest. Home to a family of boars.",
        price: 50,
      },
      // 4
      {
        ownerId: 5,
        address: "7 Butterfly Avenue",
        city: "Takinogawa",
        state: "Tokyo",
        country: "Japan",
        lat: 35.703858,
        lng: 139.735181,
        name: "Butterfly Mansion",
        description:
          "The grand estate of the Kocho family, known for their expertise in medicine and poison. Relax, heal from battle, and get stronger for your next mission with state-of-the-art care and training provided by our on-site staff.",
        price: 150,
      },
      // 5
      {
        ownerId: 6,
        address: "27 Mountain Path",
        city: "Okutama",
        state: "Tokyo",
        country: "Japan",
        lat: null,
        lng: null,
        name: "Urokodaki's Tranquil Abode",
        description:
          "A serene and secluded house nestled deep within the mountains at the base of Mt. Sagiri. Aspiring demon slayers looking to learn the Water Breathing style can train with the former Water Hashira here before moving on to Final Selection when ready.",
        price: 100,
      },
      // 6
      {
        ownerId: 7,
        address: "789 Shadow Avenue",
        city: "Eternia",
        state: "Dark Realm",
        country: "Japan",
        lat: null,
        lng: null,
        name: "Muzan's Infinity Castle",
        description:
          "A sprawling, ominous castle that stretches into infinity, serving as the stronghold of the demon king Muzan. It emanates an aura of darkness and malevolence, striking fear into the hearts of those who dare to approach.",
        price: 9999,
      },
      // 7
      {
        ownerId: 8,
        address: "456 Magical Lane",
        city: "Porthaven",
        state: "The Coast",
        country: "Ingary",
        lat: null,
        lng: null,
        name: "Howl's Moving Castle",
        description:
          "A whimsical and enchanted moving castle, home to the enigmatic wizard Howl. It roams the lands, defying the laws of physics and capturing the imaginations of all who encounter it.",
        price: 5000,
      },
      // 8
      {
        ownerId: 11,
        address: "123 Asteroid Lane",
        city: "Mars",
        state: "Solar System",
        country: "Space",
        lat: null,
        lng: null,
        name: "The Bebop",
        description:
          "Welcome aboard the Bebop, the coolest ship in the galaxy! Join the ragtag crew on their bounty hunting adventures across space. Equipped with advanced tech and a cozy living area. Get ready for action, jazz, and a wild ride through the cosmos!",
        price: 250,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: [
          "Kamado Family Home",
          "Zenitsu's Apartment",
          "Tomioka Family Dojo",
          "Butterfly Mansion",
        ],
      },
    });
  },
};
