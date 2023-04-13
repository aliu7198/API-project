const router = require("express").Router();
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

// // POST /api/test
// router.post("/test", function (req, res) {
//   res.json({ requestBody: req.body });
// });

module.exports = router;
