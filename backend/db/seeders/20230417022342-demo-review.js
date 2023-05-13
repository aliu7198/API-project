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
        review: `This is a charming little house that offers a glimpse into life in the countryside. The location is great, with plenty of beautiful scenery in the surrounding mountains. Unfortunately it is also where Tanjiro's family met their untimely demise.`,
        stars: 3,
      },
      {
        spotId: 2,
        userId: 3,
        review: 'TOO MANY PEOPLE AND LIGHTS AND SOUNDS, STUPID MONITSU TOLD ME TO STAY HERE AND I HATE IT',
        stars: 1,
      },
      {
        spotId: 3,
        userId: 2,
        review: `Literally a cave. I don't know what I expected but I want to go home. The boars keep chasing me around, this is scary!`,
        stars: 1,
      },
      {
        spotId: 3,
        userId: 1,
        review: `This was a nice place to stay and rest for the night while traveling for a mission. Thank you to Inosuke and his family for hosting!`,
        stars: 5,
      },
      {
        spotId: 4,
        userId: 1,
        review: `The grounds of the mansion are immaculately maintained, with lush gardens that create a peaceful and relaxing atmosphere. The staff is incredibly attentive and accommodating, making sure that every need is met as we recover and train for the next mission.`,
        stars: 5,
      },
      {
        spotId: 4,
        userId: 2,
        review: `A haven of elegance and grace. The mansion's exquisite design, tranquil gardens, and cute and caring staff created a sanctuary where I found solace and strength. The Estate's teachings shaped my journey as a Demon Slayer. A true home for growth and self-discovery!`,
        stars: 5,
      },
      {
        spotId: 4,
        userId: 3,
        review: `FOODIE HEAVEN! Insanely delicious grub, flavor explosions, awesome staff fueling my warrior spirit! It's a dream where good eats meet intense training. Still salivating just reminiscing! YEAH!`,
        stars: 5,
      },
      {
        spotId: 5,
        userId: 1,
        review: `Tranquil and transformative. Mr. Urokodaki's guidance, serene location, and heartfelt teachings made my stay an unforgettable experience. I am grateful for the opportunity to train and grow in such a beautiful setting.`,
        stars: 5,
      },
      {
        spotId: 5,
        userId: 14,
        review: `Serene haven for rest and rejuvenation. Cozy quarters ensured peaceful slumber and allowed me to recharge my energy. Mr. Urokodaki is a very kind host and took good care of my brother and I during our stay here.`,
        stars: 5,
      },
      {
        spotId: 6,
        userId: 13,
        review: `This castle is a magnificent homage to our leader, Muzan-sama. Ethereal and ever-shifting, it embodies his grandeur. Within, I reveled in the power he bestowed upon me. Truly, an honor to have existed within its hallowed walls.`,
        stars: 5,
      },
      {
        spotId: 7,
        userId: 9,
        review: `This enchanting and whimsical experience made me feel like I was living in a fairytale. The adventurous journey through magical lands filled me with awe and excitement. Despite occasional chaos, it added an extra thrill to the overall experience!`,
        stars: 4,
      },
      {
        spotId: 8,
        userId: 12,
        review: `The Bebop ship served as a trusty companion for our bounty hunting escapades, always getting us where we needed to be. While the amenities were modest, they had a certain nostalgic appeal. Sure, repairs were frequent, and the space was cozy, but it added to the sense of adventure. It may not be the lap of luxury, but the Bebop had its own rough and tumble charm.`,
        stars: 4,
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
