const express = require("express");
const {
  get_comment,
  set_comment,
  edit_comment,
  delete_comment,
} = require("../controller/comment.controller");
const connection = require("../database");
const verifyToken = require("../validate/authentication");
const router = express.Router();

router.post("/get_comment", verifyToken, get_comment);

router.post("/set_comment", verifyToken, set_comment);

router.post("/edit-comment", verifyToken, edit_comment);

router.post("/delete-comment", verifyToken, delete_comment);

module.exports = router;
