const express = require("express");
const router = express.Router();
const {
  signUp,
  sendOtp,
  resendOtp,
  verifyOtp,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

router.post("/signup", signUp);
router.post("/sendotp", sendOtp);
router.post("/resendotp", resendOtp);
router.post("/verifyotp", verifyOtp);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);

module.exports = router;
