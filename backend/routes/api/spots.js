const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { restoreUser, requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Spot, Review, SpotImage, User } = require("../../db/models");

const router = express.Router();
/*****************************************************************************/

// GET /spots/current
router.get("/current", restoreUser, requireAuth, async (req, res, next) => {
  const { user } = req;

  const spots = await Spot.findAll({
    where: {
      ownerId: user.dataValues.id,
    },
    include: [{ model: Review }, { model: SpotImage }],
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

// GET /spots/:spotId
router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [
      { model: Review },
      { model: SpotImage },
      { model: User, as: "Owner", attributes: ["id", "firstName", "lastName"]},
    ],
  });

  if (spot) {
    const spotObj = spot.toJSON();

    if (spotObj.Reviews.length) {
      let sum = 0;
      spotObj.Reviews.forEach((review) => {
        sum += review.stars;
      });
      spotObj.numReviews = spot.Reviews.length;
      spotObj.avgStarRating = sum / spot.Reviews.length;
      delete spotObj.Reviews;
    }

    return res.json(spotObj);
  } else {
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
});

// GET /spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
    include: [{ model: Review }, { model: SpotImage }],
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

// Validator for Spot
const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

// POST /spots/:spotId/images
router.post("/:spotId/images", requireAuth, restoreUser, async (req, res) => {
  // require authentication & authorization
  const { user } = req;

  const { url, preview } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId === user.id) {
    const newSpotImage = await spot.createSpotImage({ url, preview });
    return res.json({
      id: newSpotImage.id,
      url: newSpotImage.url,
      preview: newSpotImage.preview
    });
  } else {
    return res.status(403).json({
      message: "Forbidden",
    });
  }
});

// POST /spots
router.post("/", requireAuth, restoreUser, validateSpot, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const newSpot = await Spot.create({
    ownerId: user.dataValues.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  return res.status(201).json(newSpot);
});

// PUT /spots/:spotId
router.put('/:spotId', requireAuth, restoreUser, validateSpot, async (req, res) => {
  const { user } = req;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found"
    });
  }

  if (spot.ownerId === user.id) {
    await spot.update({...req.body});
    return res.json(spot);
  } else {
    return res.status(403).json({
      message: "Forbidden",
    });
  }
});

/*****************************************************************************/
module.exports = router;
