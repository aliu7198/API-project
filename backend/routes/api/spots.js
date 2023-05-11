const express = require("express");
const { check } = require("express-validator");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const validateQuery = require("../../utils/query-validator");
const {
  Spot,
  Review,
  SpotImage,
  User,
  ReviewImage,
  Booking,
} = require("../../db/models");
const { validateReview } = require("./reviews");
const { validateBooking } = require("./bookings");
const { Op } = require("sequelize");

const router = express.Router();

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude is not valid"),
  check("lng")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .isLength({min: 30})
    .withMessage("Description needs a minimum of 30 characters"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per night is required"),
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

    // CHANGE TO FOR LOOP??
    spot.previewImage = null;
    if (spot.SpotImages.length) {
      for (let i = 0; i < spot.SpotImages.length; i++) {
        const image = spot.SpotImages[i];
        if (image.preview) {
          spot.previewImage = image.url;
        }
      }
    }

    delete spot.Reviews;
    delete spot.SpotImages;
  });

  return res.json({ Spots: spotsArr });
});

// Get all Bookings for a Spot based on the Spot's id
// GET /spots/:spotId/bookings
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const { user } = req;

  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  let bookings;
  if (spot.ownerId === user.id) {
    bookings = await spot.getBookings({
      include: [{ model: User, attributes: ["id", "firstName", "lastName"] }],
    });
  } else {
    bookings = await spot.getBookings({
      attributes: ["spotId", "startDate", "endDate"],
    });
  }
  return res.json({ Bookings: bookings });
});

// Get all Reviews by a Spot's id
// GET /spots/:spotId/reviews
router.get("/:spotId/reviews", async (req, res) => {
  const reviews = await Review.findAll({
    where: { spotId: req.params.spotId },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: ReviewImage },
    ],
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
    include: [
      { model: Review },
      { model: SpotImage },
      { model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] },
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
router.get("/", validateQuery, async (req, res) => {
  const { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  const pagination = {};
  if (page >= 1 && size >= 1) {
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  }

  const where = {};

  if (maxLat) where.lat = { [Op.lte]: +maxLat };
  if (minLat) where.lat = { [Op.gte]: +minLat };
  if (maxLat && minLat) where.lat = { [Op.between]: [+minLat, +maxLat] };
  if (minLng) where.lng = { [Op.lte]: +minLng };
  if (maxLng) where.lng = { [Op.gte]: +maxLng };
  if (maxLng && minLng) where.lng = { [Op.between]: [+minLng, +maxLng] };
  if (minPrice) where.price = { [Op.gte]: +minPrice };
  if (maxPrice) where.price = { [Op.lte]: +maxPrice };
  if (minPrice && maxPrice)
    where.price = { [Op.between]: [+minPrice, +maxPrice] };

  const spots = await Spot.findAll({
    where,
    include: [{ model: Review }, { model: SpotImage }],
    ...pagination,
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

    // CHANGE TO FOR LOOP??
    spot.previewImage = null;
    if (spot.SpotImages.length) {
      for (let i = 0; i < spot.SpotImages.length; i++) {
        const image = spot.SpotImages[i];
        if (image.preview) {
          spot.previewImage = image.url;
        }
      }
    }

    delete spot.Reviews;
    delete spot.SpotImages;
  });

  return res.json({ Spots: spotsArr, page, size });
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

// Create a Booking from a Spot based on the Spot's id
// POST /spots/:spotId/booking
router.post(
  "/:spotId/bookings",
  requireAuth,
  validateBooking,
  async (req, res) => {
    const { user } = req;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const spot = await Spot.findByPk(req.params.spotId, {
      include: [{ model: Booking }],
    });

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    if (spot.ownerId === user.id) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    // booking conflict
    for (let booking of spot.Bookings) {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      const errors = {};
      if (startDate >= bookingStart && startDate <= bookingEnd) {
        errors.startDate = "Start date conflicts with an existing booking";
      }
      if (endDate >= bookingStart && endDate <= bookingEnd) {
        errors.endDate = "End date conflicts with an existing booking";
      }
      if (startDate < bookingStart && endDate > bookingEnd) {
        errors.endDate = "End date conflicts with an existing booking";
      }
      if (Object.keys(errors).length) {
        return res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors,
        });
      }
    }

    const newBooking = await spot.createBooking({
      userId: user.id,
      ...req.body,
    });

    return res.json(newBooking);
  }
);

// Create a Review for a Spot based on the Spot's id
// POST /spots/:spotId/reviews
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res) => {
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
  }
);

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
