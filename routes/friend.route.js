const express = require("express");
const {
  get_requested_friends,
  get_user_friends,
  set_accept_friend,
  get_list_suggested_friends,
  set_request_friend,
} = require("../controller/friend.controller");
const verifyToken = require("../validate/authentication");
const router = express.Router();

router.post("/get_requested_friends", verifyToken, get_requested_friends);

router.post("/get_user_friends", verifyToken, get_user_friends);

router.post("/set_accept_friend", verifyToken, set_accept_friend);

router.post(
  "/get_list_suggested_friends",
  verifyToken,
  get_list_suggested_friends
);

router.post("/set_request_friend", verifyToken, set_request_friend);

module.exports = router;
