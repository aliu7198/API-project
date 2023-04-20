const express = require("express");
const { check } = require("express-validator");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Spot, Review, SpotImage, User, ReviewImage } = require("../../db/models");

const router = express.Router();

const validateReview = [
  check("review")
  .exists({ checkFalsy: true })
  .withMessage("Street address is required"),
  check("stars")
  .exists({ checkFalsy: true })
  .isInt({min: 1, max: 5})
  .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
];
/*****************************************************************************/

// Get all Reviews of the Current User
// GET /reviews/current

router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;

  const reviews = await Review.findAll({
    where: {
      userId: user.id,
    },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      {
        model: Spot,
        include: [{ model: SpotImage }],
        attributes: { exclude: ["description", "createdAt", "updatedAt"] },
      },
      { model: ReviewImage },
    ],
  });

  const reviewsArr = reviews.map((review) => review.toJSON());

  reviewsArr.forEach((review) => {
    review.Spot.previewImage = null;
    if (review.Spot.SpotImages.length) {
      review.Spot.SpotImages.forEach((image) => {
        if (image.preview) {
          review.Spot.previewImage = image.url;
        }
      });
    }
    delete review.Spot.SpotImages;
  });

  return res.json({ Reviews: reviewsArr });
});

// Add an Image to a Review based on the Review's id
// POST /reviews/:reviewId/images
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const { user } = req;
  const review = await Review.findByPk(req.params.reviewId, {
    include: [{model: ReviewImage}]
  });

  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
    });
  }

  if (review.userId !== user.id ) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  if (review.ReviewImages.length >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached"
    });
  } else {
    const newReviewImage = await review.createReviewImage({...req.body});
    return res.json({
      id: newReviewImage.id,
      url: newReviewImage.url
    });
  }
});

/*****************************************************************************/
module.exports.reviewsRouter = router;
module.exports.validateReview = validateReview;
