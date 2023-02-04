const express = require("express");
const verifyToken = require("../validate/authentication");
const router = express.Router();
const {
  signUp,
  login,
  logout,
  getVerifyCode,
  checkVerifyCode,
} = require("../controller/authentication.controller");
require("dotenv").config();

router.post("/signup", signUp);

router.post("/login", login);

router.post("/logout", verifyToken, logout);

router.post("/get_verify_code", getVerifyCode);

router.post("/check_verify_code", checkVerifyCode);

module.exports = router;
