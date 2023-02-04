const express = require("express");
const {
  get_push_settings,
  set_push_settings,
  set_devtoken,
  check_new_version,
} = require("../controller/setting.controller");

const verifyToken = require("../validate/authentication");
const router = express.Router();

/*-----------------------------------------------SETTING-------------------------------------- */
router.post("/get_push_settings", verifyToken, get_push_settings);

router.post("/set_push_settings", verifyToken, set_push_settings);

router.post("/set_devtoken", verifyToken, set_devtoken);

router.post("/check_new_version", verifyToken, check_new_version);

module.exports = router;
