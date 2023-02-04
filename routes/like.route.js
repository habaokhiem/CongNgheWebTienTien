const express = require("express");
const { like, get_list_posts_like } = require("../controller/like.controller");
const verifyToken = require("../validate/authentication");
const router = express.Router();

router.post("/", verifyToken, like);

router.post("/get-list-posts-like", verifyToken, get_list_posts_like);
module.exports = router;
