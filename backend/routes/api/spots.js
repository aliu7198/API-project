const express = require("express");
const { check } = require("express-validator");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require("../../db/models");
const { validateReview } = require("./reviews");
const { validateBooking } = require("./bookings");

const router = express.Router();

const validateSpot = [
  check("address").exists({ checkFalsy: true }).withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country").exists({ checkFalsy: true }).withMessage("Country is required"),
  check("lat").exists({ checkFalsy: true }).isFloat({ min: -90, max: 90 }).withMessage("Latitude is not valid"),
  check("lng").exists({ checkFalsy: true }).isFloat({ min: -180, max: 180 }).withMessage("Longitude is not valid"),
  check("name").exists({ checkFalsy: true }).isLength({ max: 50 }).withMessage("Name must be less than 50 characters"),
  check("description").exists({ checkFalsy: true }).withMessage("Description is required"),
  check("price").exists({ checkFalsy: true }).withMessage("Price per day is required"),
  handleValidationErrors,
];
/*****************************************************************************/

// Get all Spots owned by the Current User
// GET /spots/current
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;

  const spots = await Spot.findAll({
    where: {
      ownerId: user.id,
    },
    include: [{ model: Review }, { model: SpotImage }],
  });

  const spotsArr = spots.map((spot) => spot.toJSON());

  spotsArr.forEach((spot) => {
    if (spot.Reviews.length) {
      let sum = 0;
      spot.Reviews.forEach((review) => {
        sum += review.stars;
      });
      spot.avgRating = (sum / spot.Reviews.length).toFixed(1);
    } else {
      spot.avgRating = (0).toFixed(1);
    }

    spot.previewImage = null;
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

// Get all Reviews by a Spot's id
// GET /spots/:spotId/reviews
router.get("/:spotId/reviews", async (req, res) => {
  const reviews = await Review.findAll({
    where: { spotId: req.params.spotId },
    include: [{ model: User, attributes: ["id", "firstName", "lastName"] }, { model: ReviewImage }],
  });

  if (!reviews.length) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  return res.json({ Reviews: reviews });
});

// Get details of a Spot from an id
// GET /spots/:spotId
router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [{ model: Review }, { model: SpotImage }, { model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] }],
  });

  if (spot) {
    const spotObj = spot.toJSON();

    if (spotObj.Reviews.length) {
      let sum = 0;
      spotObj.Reviews.forEach((review) => {
        sum += review.stars;
      });
      spotObj.numReviews = spot.Reviews.length;
      spotObj.avgStarRating = (sum / spot.Reviews.length).toFixed(1);
    } else {
      spotObj.numReviews = 0;
      spotObj.avgStarRating = (0).toFixed(1);
    }
    delete spotObj.Reviews;

    return res.json(spotObj);
  } else {
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
});

// Get all Spots
// GET /spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
    include: [{ model: Review }, { model: SpotImage }],
  });

  const spotsArr = spots.map((spot) => spot.toJSON());

  spotsArr.forEach((spot) => {
    if (spot.Reviews.length) {
      let sum = 0;
      spot.Reviews.forEach((review) => {
        sum += review.stars;
      });
      spot.avgRating = (sum / spot.Reviews.length).toFixed(1);
    } else {
      spot.avgRating = (0).toFixed(1);
    }

    spot.previewImage = null;
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

// Add an Image to a Spot based on the Spot's id
// POST /spots/:spotId/images
router.post("/:spotId/images", requireAuth, async (req, res) => {
  // require authentication & authorization
  const { user } = req;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId !== user.id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  } else {
    const newSpotImage = await spot.createSpotImage({ ...req.body });
    return res.json({
      id: newSpotImage.id,
      url: newSpotImage.url,
      preview: newSpotImage.preview,
    });
  }
});

// Create a Review for a Spot based on the Spot's id
// POST /spots/:spotId/reviews
router.post("/:spotId/reviews", requireAuth, validateReview, async (req, res) => {
  const { user } = req;
  const spot = await Spot.findByPk(req.params.spotId);

  const existingReview = await Review.findOne({
    where: {
      userId: user.id,
      spotId: req.params.spotId,
    },
  });

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (existingReview) {
    return res.status(500).json({
      message: "User already has a review for this spot",
    });
  }

  const newReview = await spot.createReview({
    userId: user.id,
    ...req.body,
  });
  return res.json(newReview);
});

// Create a Spot
// POST /spots
router.post("/", requireAuth, validateSpot, async (req, res) => {
  const { user } = req;
  const newSpot = await Spot.create({
    ownerId: user.id,
    ...req.body,
  });

  return res.status(201).json(newSpot);
});

// Edit a Spot
// PUT /spots/:spotId
router.put("/:spotId", requireAuth, validateSpot, async (req, res) => {
  const { user } = req;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId !== user.id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  } else {
    await spot.update({ ...req.body });
    return res.json(spot);
  }
});

// DELETE /spots/:spotId
router.delete("/:spotId", requireAuth, async (req, res) => {
  const { user } = req;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (spot.ownerId !== user.id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  } else {
    await spot.destroy();
    return res.json({
      message: "Successfully deleted",
    });
  }
});

/*****************************************************************************/
module.exports = router;
