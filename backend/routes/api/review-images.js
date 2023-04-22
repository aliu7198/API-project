const express = require("express");
const { check } = require("express-validator");
const { requireAuth } = require("../../utils/auth");
const { Review, ReviewImage } = require("../../db/models");

const router = express.Router();
/*****************************************************************************/

// Delete a Review Image
// DELETE /review-images/:imageId
router.delete("/:imageId", requireAuth, async (req, res) => {
  const { user } = req;
  const reviewImage = await ReviewImage.findByPk(req.params.imageId, { include: [{ model: Review }] });

  if (!reviewImage) {
    return res.status(404).json({
      message: "Review Image couldn't be found",
    });
  }

  if (reviewImage.Review.userId !== user.id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  await reviewImage.destroy();
  return res.json({
    message: "Successfully deleted",
  });
});

/*****************************************************************************/
module.exports = router;
