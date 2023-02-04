const express = require("express");
const {
  changeInfoAfterSignup,
  get_list_blocks,
  change_password,
  set_block,
  get_user_info,
  set_user_info,
} = require("../controller/user.controller");
const verifyToken = require("../validate/authentication");
const router = express.Router();

/*-----------------------------------------------USER-------------------------------------- */
router.post("/change_info_after_signup", verifyToken, changeInfoAfterSignup);

router.post("/get_list_blocks", verifyToken, get_list_blocks);

router.post("/set_block", verifyToken, set_block);

router.post("/change_password", verifyToken, change_password);

router.post("/get_user_info", verifyToken, get_user_info);

router.post("/set_user_info", verifyToken, set_user_info);

module.exports = router;
