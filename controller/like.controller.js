const moment = require("moment/moment");
const { connect } = require("../database");
const connection = require("../database");

module.exports.like = (req, res) => {
  const { id } = req.query;
  const { id_user } = req.userInfo;
  const curTime = moment().format("YYYY-MM-DD HH:mm:ss");

  connection.query(
    "SELECT * from post WHERE id = ?",
    [id],
    async function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        let post_like = results[0].post_like;
        let banned = results[0].banned;
        if (banned === 1) {
          res.send({
            code: 1010,
            message: "Bài viết đã bị khóa",
            data: [],
          });
          return;
        }
        let post = results[0];
        let listBlock = await connection
          .promise()
          .query(
            "SELECT * from block WHERE id_user = ? AND id_user_blocked = ?",
            [post.id_user, id_user],
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
          "SELECT * from post_like WHERE id_post = ? AND id_user = ?",
          [id, id_user],
          function (error, results, fields) {
            if (error) throw error;
            if (results.length === 0) {
              connection.query(
                "INSERT INTO post_like (id_post, id_user, date_like) VALUES (?, ?, ?)",
                [id, id_user, curTime],
                function (error, results, fields) {
                  if (error) throw error;
                  post_like++;
                  connection.query(
                    "UPDATE post SET post_like = ? WHERE id = ?",
                    [post_like, id],
                    function (error, results, fields) {
                      if (error) throw error;
                      res.send({
                        code: 1000,
                        message: "Bạn đã like bài viết",
                        data: {
                          like: post_like,
                        },
                      });
                      return;
                    }
                  );
                }
              );
            } else {
              let id_like = results[0].id;
              connection.query(
                "DELETE from post_like WHERE id = ?",
                [id_like],
                function (error, results, fields) {
                  if (error) throw error;
                  post_like--;
                  connection.query(
                    "UPDATE post SET post_like = ? WHERE id = ?",
                    [post_like, id],
                    function (error, results, fields) {
                      if (error) throw error;
                      res.send({
                        code: 1000,
                        message: "Bạn đã bỏ like bài viết",
                        data: {
                          like: post_like,
                        },
                      });
                      return;
                    }
                  );
                }
              );
            }
          }
        );
      } else {
        res.send({
          code: 9992,
          message: "Bài viết không tồn tại",
          data: [],
        });
        return;
      }
    }
  );
};
module.exports.get_list_posts_like = (req, res) => {
  connection.query(
    "SELECT * from post_like WHERE id_post = ?",
    [id_post],
    function (error, results, fields) {
      if (error) throw error;
      res.send({
        status: 200,
        message: "Danh sách like bài viết:",
        results: results,
      });
    }
  );
};

// module.exports.createLike = (req, res) => {
//   const { id_post, status, emotion, id_user } = req.body;
//   connection.query(
//     "INSERT INTO post_like VALUES (?, ?, ?, ?, ?)",
//     [null, id_post, status, emotion, id_user],
//     function (error, results, fields) {
//       if (error) throw error;
//       res.send({
//         status: 200,
//         message: "Bạn đã tương tác bài post",
//         results: [],
//       });
//     }
//   );
// };
// module.exports.unlikePost = (req, res) => {
//   const { id_post } = req.body;
//   connection.query(
//     "DELETE from post_like WHERE id = ?",
//     [id],
//     function (error, results, fields) {
//       if (error) throw error;
//       res.send({
//         status: 204,
//         message: "Bạn đã bỏ tương tác bài viết này",
//         results: [],
//       });
//     }
//   );
// };
// module.exports.countLikePost = (req, res) => {
//   const { id_post } = req.body;
//   connection.query(
//     "SELECT * from post_like WHERE id_post = ?",
//     [id_post],
//     function (error, results, fields) {
//       if (error) throw error;
//       res.send({
//         status: 200,
//         message: "Số like bài viết:",
//         results: results.length,
//       });
//     }
//   );
// };
