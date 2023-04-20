const express = require("express");
const { check } = require("express-validator");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require("../../db/models");

const router = express.Router();
/*****************************************************************************/

// Get all of the Current User's Bookings

router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const bookings = await Booking.findAll({
    where: {
      userId: user.id,
    },
    include: [
      {
        model: Spot,
        include: [{ model: SpotImage }],
        attributes: { exclude: ["description", "createdAt", "updatedAt"] },
      },
    ],
  });

  const bookingsArr = bookings.map((booking) => booking.toJSON());

  bookingsArr.forEach((booking) => {
    booking.Spot.previewImage = null;
    if (booking.Spot.SpotImages.length) {
      booking.Spot.SpotImages.forEach((image) => {
        if (image.preview) {
          booking.Spot.previewImage = image.url;
        }
      });
    }
    delete booking.Spot.SpotImages;
  });

  return res.json({ Bookings: bookingsArr });
});

/*****************************************************************************/
module.exports.bookingsRouter = router;
// module.exports.validateBooking = validateBooking;
