const express = require("express");
const {
  get_list_conversation,
  get_conversation,
  set_read_message,
  delete_message,
  delete_conversation,
} = require("../controller/conversation.controller");
const verifyToken = require("../validate/authentication");
const router = express.Router();

router.post("/get_list_conversation", verifyToken, get_list_conversation);
router.post("/get_conversation", verifyToken, get_conversation);
router.post("/set_read_message", verifyToken, set_read_message);
router.post("/delete_message", verifyToken, delete_message);
router.post("/delete_conversation", verifyToken, delete_conversation);

module.exports = router;
