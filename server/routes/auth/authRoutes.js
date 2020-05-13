const express = require("express");
const router = express();
const authController = require("../../controllers/authController");
const verifyAuth = require("../../middlewares/auth");

router.post("/users/register", authController.registerUser);
router.post("/users/signin", authController.signInUser);
router.get("/test", verifyAuth, (req, res) => {
  res.send(req.user);
});
module.exports = router;
