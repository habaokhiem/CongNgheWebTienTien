const connection = require("../database");
const moment = require("moment/moment");

module.exports.list_report_post = (req, res) => {
  connection.query(
    "SELECT * from report_post",
    function (error, results, fields) {
      if (error) throw error;
      res.send({
        status: 200,
        message: "Danh sách báo cáo",
        results: results,
      });
    }
  );
};
module.exports.report_post = (req, res) => {
  const { id, subject, details } = req.query;
  const id_user_report = req.userInfo.id_user;
  const curTime = moment().format("YYYY-MM-DD HH:mm:ss");
  connection.query(
    "SELECT * from post WHERE id = ?",
    [id],
    async function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        if (results[0].banned === 1) {
          res.send({
            code: 1010,
            message: "Bài viết đã bị khóa không thể tố cáo!",
            data: [],
          });
          return;
        }
        let post = results[0];
        let listBlock = await connection
          .promise()
          .query(
            "SELECT * from block WHERE id_user = ? AND id_user_blocked = ?",
            [post.id_user, id_user_report],
            function (error, results, fields) {
              if (error) throw error;
            }
          );
        let is_blocked = listBlock[0].length === 0 ? false : true;
        let is_banned = post.banned;
        if (is_banned === 1) {
          res.send({
            code: 9992,
            message: "Bài viết đã bị khoá",
            data: [],
          });
          return;
        }
        if (is_blocked) {
          res.send({
            code: 9992,
            message: "Bạn đã bị chặn bởi người đăng bài",
            data: {
              is_blocked,
            },
          });
          return;
        }
        connection.query(
          "INSERT INTO report_post (id_post, subject, details, id_user_report, date_report) VALUES (?, ?, ?, ?, ?)",
          [id, subject, details, id_user_report, curTime],
          function (error, results, fields) {
            if (error) throw error;
            res.send({
              code: 1000,
              message: "Bạn đã tố cáo thành công!",
              data: [],
            });
          }
        );
      } else {
        res.send({
          code: 9992,
          message: "Bài viết không tồn tại!",
          data: [],
        });
      }
    }
  );
};
