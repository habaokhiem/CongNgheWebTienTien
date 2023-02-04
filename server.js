const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");
const commentRoute = require("./routes/comment.route");
const likeRoute = require("./routes/like.route");
const searchRoute = require("./routes/search.route");
const settingRoute = require("./routes/setting.route");
const notificationRoute = require("./routes/notification.route");
const conversationRoute = require("./routes/conversation.route");
const friendRoute = require("./routes/friend.route");
const reportRoute = require("./routes/report.route");
const authenticationRoute = require("./routes/authentication.route");
const connection = require("./database");

const port = 3000;

// app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*-----------------------------------------------AUTHENTICATION-------------------------------------- */
app.use("/authentication", authenticationRoute);
/*-----------------------------------------------USER-------------------------------------- */
app.use("/user", userRoute);
/*-----------------------------------------------POST-------------------------------------- */
app.use("/post", postRoute);
/*-----------------------------------------------COMMENT-------------------------------------- */
app.use("/comment", commentRoute);
/*-----------------------------------------------LIKE-------------------------------------- */
app.use("/like", likeRoute);
/*-----------------------------------------------REPORT-------------------------------------- */
app.use("/report", reportRoute);
/*-----------------------------------------------SEARCH-------------------------------------- */
app.use("/search", searchRoute);
/*-----------------------------------------------FRIEND-------------------------------------- */
app.use("/friend", friendRoute);
/*-----------------------------------------------SETTING-------------------------------------- */
app.use("/setting", settingRoute);
/*-----------------------------------------------NOTIFICATION-------------------------------------- */
app.use("/notification", notificationRoute);
/*-----------------------------------------------CONVERSATION-------------------------------------- */
app.use("/conversation", conversationRoute);
connection.connect();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
