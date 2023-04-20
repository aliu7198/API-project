const express = require("express");
const { check } = require("express-validator");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Spot, Review, SpotImage, User, ReviewImage } = require("../../db/models");

const router = express.Router();
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

/*****************************************************************************/
module.exports = router;
