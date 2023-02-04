const express = require("express");
const {
  search,
  get_saved_search,
  del_saved_search,
} = require("../controller/search.controller");
const verifyToken = require("../validate/authentication");
const router = express.Router();

router.post("/", verifyToken, search);

router.post("/get_saved_search", verifyToken, get_saved_search);
router.post("/del_saved_search", verifyToken, del_saved_search);

module.exports = router;
