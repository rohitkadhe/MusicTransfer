var express = require("express");
var router = express();
var authController = require("../../controllers/authController");
var verifyAuth = require("../../middlewares/auth");

router.post("/users/register", authController.registerUser);
router.post("/users/signin", authController.signInUser);
router.get("/test", verifyAuth, (req, res) => {
  res.send(req.user);
});
module.exports = router;
