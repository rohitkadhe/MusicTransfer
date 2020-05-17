const express = require("express");
const router = express();
const authController = require("../../controllers/authController");
const verifyAuth = require("../../middlewares/auth");

router.post("/users/register", authController.register);
router.post("/users/login", authController.login);

module.exports = router;
