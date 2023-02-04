const express = require("express");
const {
  list_report_post,
  report_post,
} = require("../controller/report.controller");
const verifyToken = require("../validate/authentication");
const router = express.Router();

router.get("/list-report-post", verifyToken, list_report_post);

router.post("/report_post", verifyToken, report_post);

module.exports = router;
