const express = require("express");
const {
  get_notification,
  set_read_notification,
} = require("../controller/notification.controller");
const verifyToken = require("../validate/authentication");
const router = express.Router();

router.post("/get_notification", verifyToken, get_notification);

router.post("/set_read_notification", verifyToken, set_read_notification);

module.exports = router;
