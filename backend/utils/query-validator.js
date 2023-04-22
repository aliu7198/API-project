const { handleValidationErrors } = require("./validation");
const { query } = require("express-validator");

/*****************************************************************************/

const validateQuery = [
  query("page").default(1).isInt({ min: 1, max: 10 }).withMessage("Page must be greater than or equal to 1"),
  query("size").default(20).isInt({ min: 1, max: 20 }).withMessage("Size must be greater than or equal to 1"),
  query("maxLat").optional().isFloat({ min: -90, max: 90 }).withMessage("Maximum latitude is invalid"),
  query("minLat").optional().isFloat({ min: -90, max: 90 }).withMessage("Minimum latitude is invalid"),
  query("maxLng").optional().isFloat({ min: -180, max: 180 }).withMessage("Maximum longitude is invalid"),
  query("minLng").optional().isFloat({ min: -180, max: 180 }).withMessage("Minimum longitude is invalid"),
  query("minPrice").optional().isCurrency({ allow_negatives: false }).withMessage("Minimum price must be greater than or equal to 0"),
  query("maxPrice").optional().isCurrency({ allow_negatives: false }).withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors,
];

/*****************************************************************************/
module.exports = validateQuery;
