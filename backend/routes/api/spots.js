const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// GET /spots/current
router.get("/current", restoreUser, requireAuth, async (req, res, next) => {
  const { user } = req;

  // Alternate Solution w/ raw:true in options, check with TL on how this works

  //   const spots = await Spot.findAll({
  //     where: {
  //       ownerId: user.dataValues.id,
  //     },
  //     raw: true,
  //   });

  //   spots.forEach(async (spot) => {
  //     const sumStars = await Review.sum("stars", { where: { spotId: spot.id } });
  //     const totalReviews = await Review.count({ where: { spotId: spot.id } });
  //     spot.avgRating = sumStars / totalReviews;
  //     // console.log(spot);
  //   });

  // console.log(spots);
  // return res.json({ Spots: spots });

  const spots = await Spot.findAll({
    where: {
      ownerId: user.dataValues.id,
    },
    include: [{ model: Review }, { model: SpotImage }]
  });

  const spotsArr = [];

  spots.forEach((spot) => {
    spotsArr.push(spot.toJSON());
  });

  spotsArr.forEach(async (spot) => {
    if (spot.Reviews.length) {
      let sum = 0;
      spot.Reviews.forEach((review) => {
        sum += review.stars;
      });
      spot.avgRating = sum / spot.Reviews.length;
    }

    if (spot.SpotImages.length) {
      spot.SpotImages.forEach((image) => {
        if (image.preview) {
          spot.previewImage = image.url;
        }
      });
    }
    delete spot.Reviews;
    delete spot.SpotImages;
  });

  return res.json({ Spots: spotsArr });
});

// GET /spots
router.get("/", async (req, res, next) => {
  const spots = await Spot.findAll({
    include: [{ model: Review }, { model: SpotImage }],
  });

  let spotsArr = [];
  spots.forEach((spot) => {
    spotsArr.push(spot.toJSON());
  });

  spotsArr.forEach(async (spot) => {
    if (spot.Reviews.length) {
      let sum = 0;
      spot.Reviews.forEach((review) => {
        sum += review.stars;
      });
      spot.avgRating = sum / spot.Reviews.length;
    }

    if (spot.SpotImages.length) {
      spot.SpotImages.forEach((image) => {
        if (image.preview) {
          spot.previewImage = image.url;
        }
      });
    }
    delete spot.Reviews;
    delete spot.SpotImages;
  });

  return res.json({ Spots: spotsArr });
});

module.exports = router;
