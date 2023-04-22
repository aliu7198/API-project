const express = require("express");
const { check } = require("express-validator");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");
const { Spot, SpotImage, Booking } = require("../../db/models");

const router = express.Router();

const validateBooking = [
  check("startDate").exists({ checkFalsy: true }).withMessage("startDate must exist"),
  check("endDate").custom((value, { req }) => {
    if (!value) {
      throw new Error("endDate must exist");
    }
    if (new Date(value) <= new Date(req.body.startDate)) {
      throw new Error("endDate cannot be on or before startDate");
    }
    return true;
  }),
  handleValidationErrors,
];
/*****************************************************************************/

// Get all of the Current User's Bookings
// GET /bookings/current
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

// Edit a Booking
// PUT /bookings/:bookingId
router.put("/:bookingId", requireAuth, validateBooking, async (req, res) => {
  const { user } = req;
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);
  const booking = await Booking.findByPk(req.params.bookingId);

  // can't find booking
  if (!booking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
    });
  }

  // authorization
  if (booking.userId !== user.id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  // can't edit booking past end date
  if (new Date(booking.endDate) <= new Date()) {
    return res.status(403).json({
      message: "Past bookings can't be modified",
    });
  }

  // get spot of booking & its bookings, excluding current booking
  const spot = await booking.getSpot();
  const otherBookings = await spot.getBookings({
    where: {
      id: { [Op.ne]: req.params.bookingId },
    },
  });

  console.log(otherBookings);

  if (otherBookings.length) {
    // booking conflict
    for (let booking of otherBookings) {
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
  }

  await booking.update({ ...req.body });
  return res.json(booking);
});

// Delete a Booking
// DELETE /bookings/:bookingId
router.delete("/:bookingId", requireAuth, async (req, res) => {
  const { user } = req;
  const booking = await Booking.findByPk(req.params.bookingId, {
    include: [{ model: Spot }],
  });

  if (!booking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
    });
  }

  // Booking must belong to the current user or the Spot must belong to the current user
  if (booking.userId !== user.id && booking.Spot.ownerId !== user.id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  // Bookings that have been started can't be deleted
  if (new Date(booking.startDate) <= new Date()) {
    return res.status(403).json({
      message: "Bookings that have been started can't be deleted",
    });
  }

  await booking.destroy();
  return res.json({
    message: "Successfully deleted",
  });
});

/*****************************************************************************/
module.exports.bookingsRouter = router;
module.exports.validateBooking = validateBooking;
