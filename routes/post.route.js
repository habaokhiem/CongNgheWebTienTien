const express = require("express");
const verifyToken = require("../validate/authentication");
const router = express.Router();
const {
  get_list_posts,
  get_post,
  add_post,
  edit_post,
  delete_post,
  check_new_item,
  get_list_videos,
} = require("../controller/post.controller");
//VerifyToken = middleware
router.post("/get_list_posts", verifyToken, get_list_posts);

router.post("/get_post/:id", verifyToken, get_post);

router.post("/add_post", verifyToken, add_post);

router.post("/edit_post", verifyToken, edit_post);

router.post("/delete_post", verifyToken, delete_post);

router.post("/get_list_videos", verifyToken, get_list_videos);

router.post("/check_new_item", verifyToken, check_new_item);

module.exports = router;
