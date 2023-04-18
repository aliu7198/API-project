const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

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
