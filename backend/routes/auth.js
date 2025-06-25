const express = require("express");
const router = express.Router();
const {
  signUp,
  sendOtp,
  resendOtp,
  verifyOtp,
  login,
} = require("../controllers/auth");

router.post("/signup", signUp);
router.post("/sendotp", sendOtp);
router.post("/resendotp", resendOtp);
router.post("/verifyotp", verifyOtp);
router.post("/login", login);

module.exports = router;
