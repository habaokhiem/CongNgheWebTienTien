const moment = require("moment/moment");
const query = require("../common/query");
const connection = require("../database");

module.exports.get_comment = async (req, res) => {
  const { id, index, count } = req.query;
  const { id_user } = req.userInfo;
  let listPost = await query("SELECT * from post WHERE id = ?", [id]);
  let post = listPost[0];
  if (listPost.length === 0) {
    res.send({
      status: 9992,
      message: "Bài viết không tồn tại",
      results: [],
    });
    return;
  }
  let banned = post.banned;
  if (banned === 1) {
    res.send({
      code: 1010,
      message: "Bài viết đã bị khóa",
      data: [],
    });
    return;
  }
  let listComment = await query(
    "SELECT * from comment INNER JOIN user ON comment.id_user_comment=user.id_user WHERE id_post = ?",
    [id]
  );
  let listCommentResult = listComment.slice(index, +index + +count);
  let listBlock = await query(
    "SELECT * from block WHERE id_user_blocked = ? OR id_user= ?",
    [id_user, id_user]
  );
  let listBlockResult = listBlock.map((item) => {
    return id_user === item.id_user ? item.id_user_blocked : item.id_user;
  });
  let dataResponse = listCommentResult.map((item) => {
    return {
      id: item.id,
      comment: item.comment,
      created: item.created,
      poster: {
        id: item.id_user,
        name: item.username,
        avatar: item.avatar,
      },
      is_blocked: listBlockResult.includes(item.id_user_comment) ? true : false,
    };
  });
  res.send({
    code: 1000,
    message: "Tạo comment thành công",
    data: dataResponse,
  });
};

module.exports.set_comment = async (req, res) => {
  const { id, comment, index, count } = req.query;
  if (!id) {
    res.send({
      code: 1002,
      message: "Thiếu tham số id bài viết",
      data: [],
    });
    return;
  }
  if (!comment) {
    res.send({
      code: 1002,
      message: "Thiếu tham số comment",
      data: [],
    });
    return;
  }
  if (!index) {
    res.send({
      code: 1002,
      message: "Thiếu tham số index",
      data: [],
    });
    return;
  }
  if (!count) {
    res.send({
      code: 1002,
      message: "Thiếu tham số count",
      data: [],
    });
    return;
  }

  const { id_user } = req.userInfo;
  const curTime = moment().format("YYYY-MM-DD HH:mm:ss");
  let listPost = await query("SELECT * from post WHERE id = ?", [id]);
  let post = listPost[0];
  if (listPost.length === 0) {
    res.send({
      status: 9992,
      message: "Bài viết không tồn tại",
      results: [],
    });
    return;
  }
  let banned = post.banned;
  if (banned === 1) {
    res.send({
      code: 1010,
      message: "Bài viết đã bị khóa",
      data: [],
    });
    return;
  }

  await query(
    "INSERT INTO comment (id_post, id_user_comment, comment, created, modified) VALUES (?, ?, ?, ?, ?)",
    [id, id_user, comment, curTime, curTime]
  );
  let listComment = await query(
    "SELECT * from comment INNER JOIN user ON comment.id_user_comment=user.id_user WHERE id_post = ?",
    [id]
  );
  let listCommentResult = listComment.slice(index, +index + +count);
  let listBlock = await query(
    "SELECT * from block WHERE id_user_blocked = ? OR id_user= ?",
    [id_user, id_user]
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
  let listBlockResult = listBlock.map((item) => {
    return id_user === item.id_user ? item.id_user_blocked : item.id_user;
  });
  let dataResponse = listCommentResult.map((item) => {
    return {
      id: item.id,
      comment: item.comment,
      created: item.created,
      poster: {
        id: item.id_user,
        name: item.username,
        avatar: item.avatar,
      },
      is_blocked: listBlockResult.includes(item.id_user_comment) ? true : false,
    };
  });
  res.send({
    code: 1000,
    message: "Danh sách comment của bài viết",
    data: dataResponse,
  });
};
module.exports.edit_comment = (req, res) => {
  const { id, comment, image, state, is_blocked } = req.query;
  console.log("req.query: ", req.query);
  connection.query(
    "UPDATE comment SET comment = ?, image = ?, state = ?, is_blocked = ? WHERE id = ?",
    [comment, image, state, is_blocked, id],
    function (error, results, fields) {
      if (error) throw error;
      res.send({
        status: 1000,
        message: "Sửa comment thành công!",
        results: [],
      });
    }
  );
};
module.exports.delete_comment = (req, res) => {
  const { id } = req.query;
  connection.query(
    "DELETE from comment WHERE id = ?",
    [id],
    function (error, results, fields) {
      console.log("results: ", results);
      if (error) throw error;
      res.send({
        status: 1000,
        message: "Xoá thành công!",
        results: [],
      });
    }
  );
};
