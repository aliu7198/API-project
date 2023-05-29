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
        url: "https://media.discordapp.net/attachments/1105503304521363587/1106977361737555988/6cc95fb2-e138-4c8a-b062-adf69682701b.png",
        preview: true,
      },
      {
        spotId: 1,
        url: "https://media.discordapp.net/attachments/1105503304521363587/1106977359879479306/4f53d41b-2ae8-49ad-9c77-21776edb8fbc.png",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://media.discordapp.net/attachments/1105503304521363587/1106977360600903842/5677f591-aec2-4483-a2b8-cf083265c6ed.png",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://media.discordapp.net/attachments/1105503304521363587/1106977361016144044/860796bd-9743-4a04-94b8-5bb10396b9a5.png",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://media.discordapp.net/attachments/1105503304521363587/1106977358977704058/tokyo-hiking-in-oku-tama-166242.png",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://media.discordapp.net/attachments/1105503304521363587/1106959299579744378/2a3adb08-2079-43c3-b16a-040b70dd25b2.png",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106959299923685426/d06137d7-b35e-47df-8f70-06fa5bd71371.png",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106959300301168781/93731e9f-d852-4758-bc89-d4603d35e893.png",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106959300607348756/00104852-b8ed-4362-a360-63e4b0b84923.png",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106959301098086400/d8f8944a-d7f1-4053-993a-abc1810efdf6.png",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://media.discordapp.net/attachments/1105503304521363587/1106961585697726594/1000_F_285758408_hWTHOfqHNjrUvvBvFchNHe61ZjgugPND.png",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106961587065069748/small-dark-grotto-in-layered-rock-formation-selective-focus.png",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106961585408331876/maxresdefault.png",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106961586838589521/young-wild-boar.png",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106961586079399976/42BF024F-7B61-4F53-BA33-288BEFD36073.png",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://media.discordapp.net/attachments/1090663657639268482/1105503300914249768/1f3c302c_original.png",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://media.discordapp.net/attachments/1090663657639268482/1105503302214500443/ac66adb5_original.png",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://media.discordapp.net/attachments/1090663657639268482/1105503301396607156/86ce563e_original.png",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://media.discordapp.net/attachments/1105503304521363587/1105514966922055803/00fdc1f2-9c96-4463-8103-e17c44668589.png",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://media.discordapp.net/attachments/1090663657639268482/1105503304085143682/3695eaec_original.png",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106977489965830264/0232bf21-d902-43b4-9da9-64ef2c5f449e.png",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106972135517331466/photo-1544279772-58facc5d015a.png",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106972135907414146/949da369-31e4-4dc6-ae9f-d0b267fe61a6.png",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106972136393932891/ccafda40-fcab-4cdc-968e-49968f2bc463.png",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106972135211159592/HS-18.png",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106955691379396709/Demon-Slayer-Infinity-Castle-at-Ashinomaki-Onsen-Ookawaso-5.png",
        preview: true,
      },
      {
        spotId: 6,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106955693505908796/sunomata_castle-1024x768.png",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106955692167934063/Demon-Slayer-Infinity-Castle-at-Ashinomaki-Onsen-Ookawaso-9.png",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106955692553801758/Demon-Slayer-Infinity-Castle-at-Ashinomaki-Onsen-Ookawaso-14.png",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106955691807232093/Demon-Slayer-Infinity-Castle-at-Ashinomaki-Onsen-Ookawaso-7-819x1024.png",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://media.discordapp.net/attachments/1105503304521363587/1106987713770565713/dam84VksKX41JC6xbdkj--3--d5jqw.png",
        preview: true,
      },
      {
        spotId: 7,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106987713363705946/978e8d42-b9de-45ce-856e-565a9b1b9b64.png",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://media.discordapp.net/attachments/1105503304521363587/1106987714131263568/art-deco-eclectic-living-room-antwerp-antwerp-belgium-by-gert-voorjans-bvba1-1.png",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106987715142090762/Dark-Maximalist-1.png",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106987714512965733/590f8bf2170ed0ad7488a8607f26f4a9.png",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106994613971058688/b5550917-9ac3-48c7-82af-30d7ff1b6cd7.png",
        preview: true,
      },
      {
        spotId: 8,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106994615007068292/desktop-wallpaper-spaceship-bedroom-spaceship-interior.png",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106994614486966272/360_F_551744726_iwKjCX93TVRlLcDVHNlpqe8dzdr6afVq.png",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106994614243704883/science-background-fiction-interior-rendering-sci-fi-spaceship-corridors-blue-light-3d-rendering_41470-3736.png",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1106994614747005050/dark-blue-spaceship-futuristic-interior-with-window-view-on-planet-earth-3d-rendering.png",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107527702950461530/a57ab9ea-80d5-4ed0-aa15-ce536039778d.png",
        preview: true,
      },
      {
        spotId: 9,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107527703193735239/42a74e55-7a71-415a-aaef-052ae994b8ff.png",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107527703873208380/shutterstock_305138912-1-min-1-scaled-2-1536x1024.png",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107527704154230804/8b91678b_original.png",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107527703512481853/06735e73-9a79-46a1-a640-0f8cb434c1c8.png",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107531070926241862/b543f0fe-b8ac-4032-b52d-629b5c2cbed5.png",
        preview: true,
      },
      {
        spotId: 10,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107531071463104604/3de91036-ad84-416e-867f-8da9e9e76450.png",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107531072415211530/ef376ce4-5f53-402e-83fb-46e17eff96e1.png",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107531071966416916/71elOqRPEOL.png",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107531071186276502/dark-wooden-cellar-door-open-at-bottom-of-old-stone-stairs-bright-sun-light-rays-shining-in.png",
        preview: false,
      },
      {
        spotId: 11,
        url: "https://media.discordapp.net/attachments/1105503304521363587/1107536650193621043/historicalconcepts_bigcedar_0401.png",
        preview: true,
      },
      {
        spotId: 11,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107536852950454402/eb427098447484a3ebe3acac99041aaf--wayfarer-pictures-of.png",
        preview: false,
      },
      {
        spotId: 11,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107536650965352448/is-there-explained-from-where-ice-burst-came-from-are-they-v0-izp97lxdepr81.png",
        preview: false,
      },
      {
        spotId: 11,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107536651661627443/cave-of-crystals.png",
        preview: false,
      },
      {
        spotId: 11,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107536651309297714/Tour-Church-2-503x503.png",
        preview: false,
      },
      {
        spotId: 12,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107529836706148442/i4xborz4m0wa1.png",
        preview: true,
      },
      {
        spotId: 12,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107544280525975622/a4055a7e-2855-4619-a9d3-4fd3e568fa69.png",
        preview: false,
      },
      {
        spotId: 12,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107544281268375592/45e0be7c-1d9d-436b-b55c-483f7fdc06d2.png",
        preview: false,
      },
      {
        spotId: 12,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107544280249159721/3040a079-be85-4c33-99a6-6c8d87a60088.png",
        preview: false,
      },
      {
        spotId: 12,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107529836441911377/1000.png",
        preview: false,
      },
      {
        spotId: 13,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107679665553948823/latest.png",
        preview: true,
      },
      {
        spotId: 13,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107679666237624480/latest.png",
        preview: false,
      },
      {
        spotId: 13,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107679666501857412/85c3c91fe2c721fba79d3716bb8a7ebc--japanese-dojo-weapon-storage.png",
        preview: false,
      },
      {
        spotId: 13,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107679666766102538/d4e1d8e1-8a12-4c80-b006-1a1b08fe96a9.png",
        preview: false,
      },
      {
        spotId: 13,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107679667202314260/316f608045a779724f0dc82ab564f534.png",
        preview: false,
      },
      {
        spotId: 14,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107681519461466214/latest.png",
        preview: true,
      },
      {
        spotId: 14,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107681519117553724/6cad94de-62b2-425f-a035-94229643ccc6.png",
        preview: false,
      },
      {
        spotId: 14,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107681518689714206/frazer-trigg-highresscreenshot00085.png",
        preview: false,
      },
      {
        spotId: 14,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107681519864139846/aa62c10a-8448-458c-b381-9d060bf55be6.png",
        preview: false,
      },
      {
        spotId: 14,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107681520333881505/9k.png",
        preview: false,
      },
      {
        spotId: 15,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107682793061896222/5LYzTBVoS196gvYvw3zjwEG__7Sl1QTxVIk6HFR6VI4.png",
        preview: true,
      },
      {
        spotId: 15,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107682791660998677/716VgotHR6L.png",
        preview: false,
      },
      {
        spotId: 15,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107682792160112650/colorful-hyperspace-light-speed-space-warp-free-video.png",
        preview: false,
      },
      {
        spotId: 15,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107682793363873843/Hyperspace-3D-Screensaver.png",
        preview: false,
      },
      {
        spotId: 15,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107682792801837186/640px-Hands-Fingers-Crossed.png",
        preview: false,
      },
      {
        spotId: 16,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107685222541164594/51xiorm2hny51.png",
        preview: true,
      },
      {
        spotId: 16,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107685223698804736/LargePileBones15.png",
        preview: false,
      },
      {
        spotId: 16,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107685224504119446/surendra-nath-hansdah-jjk-shrine-2.png",
        preview: false,
      },
      {
        spotId: 16,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107685224965472396/a4233519634_10.png",
        preview: false,
      },
      {
        spotId: 16,
        url: "https://cdn.discordapp.com/attachments/1105503304521363587/1107685224067891220/3d6454e4495d812eea67933d34a65489e8bae0cc-1600x900.png",
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
