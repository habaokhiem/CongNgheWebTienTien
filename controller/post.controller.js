const connection = require("../database");
const moment = require("moment");
const { sortBy } = require("lodash");
const query = require("../common/query");
const isNumber = require("../common/isNumber");
module.exports.get_list_posts = async (req, res) => {
  const {
    in_campaign,
    campaign_id,
    latitude,
    longitude,
    last_id,
    index,
    count,
  } = req.query;
  const { id_user } = req.userInfo;
  if (index === undefined || index === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số index",
      data: [],
    });
    return;
  }
  if (count === undefined || count === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số count",
      data: [],
    });
    return;
  }
  if (isNumber(last_id) === false) {
    res.send({
      code: 1003,
      message: "Tham số last_id sai định dạng",
      data: [],
    });
    return;
  }
  if (last_id < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số last_id không hợp lệ",
      data: [],
    });
    return;
  }
  if (index < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số index không hợp lệ",
      data: [],
    });
    return;
  }
  if (count < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số count không hợp lệ",
      data: [],
    });
    return;
  }
  if (isNumber(index) === false) {
    res.send({
      code: 1003,
      message: "Tham số index sai định dạng",
      data: [],
    });
    return;
  }
  if (isNumber(count) === false) {
    res.send({
      code: 1003,
      message: "Tham số count sai định dạng",
      data: [],
    });
    return;
  }

  let listPost = await query(
    "SELECT * from post INNER JOIN user ON post.id_user = user.id_user WHERE id >= ? && id < ?",
    [index, +index + +count]
  );
  if (listPost.length === 0) {
    res.send({
      code: 9994,
      message: "Không còn dữ liệu",
      data: [],
    });
    return;
  }
  let new_items = await query("SELECT * from post WHERE id > ?", [last_id]);
  listPostResponse = await Promise.all(
    listPost.map(async (item, index) => {
      let listImage = await query("SELECT * from image WHERE id_post = ? ", [
        item.id,
      ]);
      let listImageResponse = listImage.map((item) => {
        return item.link_image;
      });
      let listLike = await query(
        "SELECT * from post_like WHERE id_post = ? AND id_user = ?",
        [item.id, id_user]
      );
      let isLiked = listLike.length === 0 ? false : true;
      let listBlock = await query(
        "SELECT * from block WHERE id_user = ? AND id_user_blocked = ?",
        [item.id_user, id_user]
      );
      let isBlocked = listBlock.length === 0 ? false : true;

      return {
        id: item.id,
        name: "",
        image: listImageResponse,
        video: {
          url: item.video,
          thumb: item.thumb,
        },
        describe: item.described,
        created: item.created,
        like: item.post_like,
        comment: item.post_comment,
        isLiked,
        isBlocked,
        can_comment: item.can_comment === 1 ? true : false,
        can_edit: item.can_edit === 1 ? true : false,
        banned: item.banned === 1 ? true : false,
        state: item.state,
        author: {
          id: item.id_user,
          username: item.user_name,
          avatar: item.avatar,
          online: item.online,
        },
      };
    })
  );
  res.send({
    code: 1000,
    message: "Thành công",
    data: {
      posts: listPostResponse,
      new_items: new_items.length,
      last_id: listPost[0].id,
      in_campaign: in_campaign,
      campaign_id: campaign_id,
    },
  });
};

module.exports.get_post = async (req, res) => {
  const { id } = req.params;
  const { id_user } = req.userInfo;
  let listPost = await connection
    .promise()
    .query(
      "SELECT * from post WHERE id = ? ",
      [id],
      function (error, results, fields) {
        if (error) throw error;
      }
    );
  let post = listPost[0][0];
  console.log("post: ", post);
  if (listPost[0].length === 0) {
    res.send({
      code: 9992,
      message: "Post không tồn tại",
      data: [],
    });
    return;
  }
  let listImage = await connection
    .promise()
    .query(
      "SELECT * from image WHERE id_post = ? ",
      [id],
      function (error, results, fields) {
        if (error) throw error;
      }
    );
  let images =
    listImage.length === 0
      ? []
      : listImage[0].map((item) => {
          return {
            id: item.id_image,
            url: item.link_image,
          };
        });
  let listLike = await connection
    .promise()
    .query(
      "SELECT * from post_like WHERE id_post = ? AND id_user = ?",
      [id, id_user],
      function (error, results, fields) {
        if (error) throw error;
      }
    );
  let isLiked = listLike[0].length === 0 ? false : true;
  let authorList = await connection
    .promise()
    .query(
      "SELECT * from user WHERE id_user = ?",
      [post.id_user],
      function (error, results, fields) {
        if (error) throw error;
      }
    );
  let author = authorList[0][0];
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
  res.send({
    code: 1000,
    message: "Thông tin bài viết",
    data: {
      id: post.id,
      described: post.described,
      created: post.created,
      modified: post.modified,
      like: post.post_like,
      comment: post.post_comment,
      is_liked: isLiked,
      image: images,
      video: {
        url: post.video,
        thumb: post.thumb,
      },
      author: {
        id: post.id_user,
        name: author.username,
        avatar: author.avatar,
        online: author.online,
      },
      state: post.state,
      is_blocked: is_blocked,
      can_edit: id_user === post.id_user ? true : false,
      banned: post.banned === 1 ? true : false,
      can_comment: post.can_comment === 1 ? true : false,
      url: `post/${post.id}`,
    },
  });
  return;
};
module.exports.add_post = (req, res) => {
  const curTime = moment().format("YYYY-MM-DD HH:mm:ss");
  const { image, video, described, status, thumb } = req.query;
  let state = 1,
    post_like = 0,
    post_comment = 0,
    banned = 0,
    can_comment = 1,
    can_edit = 1;
  if (image && video) {
    res.send({
      code: 9991,
      message: "Không thể có cả ảnh và video trong 1 bài viết",
      data: {},
    });
    return;
  }
  connection.query(
    "INSERT INTO post (id_user, video, thumb, described, status, created, modified, state, post_like, post_comment, banned, can_comment, can_edit) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      req.userInfo.id_user,
      video ? video : null,
      thumb ? thumb : null,
      described ? described : null,
      status ? status : null,
      curTime,
      curTime,
      state,
      post_like,
      post_comment,
      banned,
      can_comment,
      can_edit,
    ],
    function (error, results, fields) {
      if (error) throw error;
      if (!!image && image.length > 0) {
        for (let i = 0; i < image.length; i++) {
          connection.query(
            "INSERT INTO image (id_post, link_image) VALUES (?, ?)",
            [results.insertId, image[i]],
            function (error, results, fields) {
              if (error) throw error;
            }
          );
        }
      }
      res.send({
        code: 1000,
        message: "Tạo bài viết thành công!",
        data: {
          id_post: results.insertId,
          url: "/post/" + results.insertId,
        },
      });
      return;
    }
  );
};
module.exports.edit_post = (req, res) => {
  const { id, described, status, image, image_del, image_sort, video, thumb } =
    req.query;
  if (image && (video || thumb)) {
    res.send({
      code: 9991,
      message: "Không thể có cả ảnh và video trong 1 bài viết",
      data: {},
    });
    return;
  }

  if (!!image && !image_sort) {
    res.send({
      code: 1002,
      message: "Thiếu tham số image_sort",
      data: {},
    });
    return;
  }
  if (!image && !!image_sort) {
    res.send({
      code: 1002,
      message: "Thiếu tham số image",
      data: {},
    });
    return;
  }
  if (!!image && !!image_sort && image.length !== image_sort.length) {
    res.send({
      code: 1002,
      message: "Số lượng 2 tham số không khớp",
      data: {},
    });
    return;
  }
  const curTime = moment().format("YYYY-MM-DD HH:mm:ss");
  connection.query(
    "SELECT * from post WHERE id = ?",
    [id],
    function (error, results, fields) {
      if (results.length > 0) {
        if ((!!results[0].video || !!results[0].thumb) && !!image) {
          res.send({
            code: 9991,
            message: "Bài viết đã có video không thể có ảnh",
            data: {},
          });
          return;
        }

        connection.query(
          "UPDATE post SET described = ?, status = ?,video = ?, thumb= ?, modified = ? WHERE id = ?",
          [
            described ? described : null,
            status ? status : null,
            video ? video : null,
            thumb ? thumb : null,
            curTime,
            id,
          ],
          function (error, results, fields) {
            if (error) throw error;
            connection.query(
              "SELECT * from image WHERE id_post = ?",
              [id],
              function (error, results, fields) {
                if (results.length > 0) {
                  if (!!video) {
                    res.send({
                      code: 9991,
                      message: "Bài viết đã có ảnh không thể có video",
                      data: {},
                    });
                    return;
                  }
                  let listImageAfterDelete = results.filter((item) => {
                    let itemImage = item.id_image.toString();
                    let isDel = !!image_del
                      ? image_del.indexOf(itemImage) > -1
                      : false;
                    return !isDel;
                  });
                  if (
                    listImageAfterDelete.length === results.length &&
                    !!image_del
                  ) {
                    res.send({
                      code: 9997,
                      message: "Danh sách ID ảnh xoá không đúng",
                      data: {},
                    });
                    return;
                  }
                  let newImages = listImageAfterDelete.map(
                    (item) => item.link_image
                  );
                  console.log("newImages: ", newImages);
                  isValidImageSort =
                    !image_sort ||
                    image_sort.every((item) => {
                      return (
                        item >= 0 && item < newImages.length + image.length
                      );
                    });
                  if (!isValidImageSort) {
                    res.send({
                      code: 9998,
                      message: "tham số image_sort không phù hợp",
                      data: {},
                    });
                    return;
                  }
                  if (!!image && image.length > 0) {
                    for (let i = 0; i < image.length; i++) {
                      newImages.splice(image_sort[i], 0, image[i]);
                      console.log("newImages: ", newImages);
                    }
                  }
                  connection.query(
                    "DELETE from image WHERE id_post = ?",
                    [id],
                    function (error, results, fields) {
                      if (error) throw error;
                      for (let i = 0; i < newImages.length; i++) {
                        connection.query(
                          "INSERT INTO image (id_post, link_image) VALUES (?, ?)",
                          [id, newImages[i]],
                          function (error, results, fields) {
                            if (error) throw error;
                          }
                        );
                      }
                    }
                  );
                }
                res.send({
                  code: 1000,
                  message: "Sửa bài viết thành công!",
                  data: {
                    id_post: id,
                    url: "/post/" + id,
                  },
                });
                return;
              }
            );
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
module.exports.delete_post = (req, res) => {
  const { id } = req.query;
  connection.query(
    "SELECT * from post WHERE id = ?",
    [id],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        if (results[0].banned === 1) {
          res.send({
            code: 9992,
            message: "Bài viết đã bị khoá không thể xoá",
            data: [],
          });
          return;
        }
        connection.query(
          "DELETE from post WHERE id = ?",
          [id],
          function (error, results, fields) {
            if (error) throw error;
            res.send({
              code: 1000,
              message: "Xoá bài viết thành công!",
              data: [],
            });
          }
        );
        connection.query(
          "DELETE from comment WHERE id_post = ?",
          [id],
          function (error, results, fields) {
            if (error) throw error;
          }
        );
        connection.query(
          "DELETE from image WHERE id_post = ?",
          [id],
          function (error, results, fields) {
            if (error) throw error;
          }
        );
        connection.query(
          "DELETE from report_post WHERE id_post = ?",
          [id],
          function (error, results, fields) {
            if (error) throw error;
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
module.exports.check_new_item = (req, res) => {
  const { last_id } = req.query;
  if (!last_id) {
    res.send({
      code: 1002,
      message: "Thiếu tham số last_id",
      data: [],
    });
    return;
  }
  if (isNumber(last_id) === false) {
    res.send({
      code: 1003,
      message: "Tham số last_id sai định dạng",
      data: [],
    });
    return;
  }
  if (last_id < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số last_id không hợp lệ",
      data: [],
    });
    return;
  }
  connection.query(
    "SELECT * from post where id > ?",
    [last_id],
    function (error, results, fields) {
      if (error) throw error;
      sortListPost = sortBy(results, "modified").reverse();
      console.log("sortListPost: ", sortListPost);
      res.send({
        code: 1000,
        message: "Danh sách bài viết gần nhất",
        data: sortListPost,
      });
      return;
    }
  );
};

module.exports.get_list_videos = async (req, res) => {
  const {
    in_campaign,
    campaign_id,
    latitude,
    longitude,
    last_id,
    index,
    count,
  } = req.query;
  const { id_user } = req.userInfo;
  if (index === undefined || index === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số index",
      data: [],
    });
    return;
  }
  if (count === undefined || count === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số count",
      data: [],
    });
    return;
  }
  if (isNumber(last_id) === false) {
    res.send({
      code: 1003,
      message: "Tham số last_id sai định dạng",
      data: [],
    });
    return;
  }
  if (last_id < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số last_id không hợp lệ",
      data: [],
    });
    return;
  }
  if (index < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số index không hợp lệ",
      data: [],
    });
    return;
  }
  if (count < 0 || count > 20) {
    res.send({
      code: 1004,
      message: "Giá trị tham số count không hợp lệ",
      data: [],
    });
    return;
  }
  if (isNumber(index) === false) {
    res.send({
      code: 1003,
      message: "Tham số index sai định dạng",
      data: [],
    });
    return;
  }
  if (isNumber(count) === false) {
    res.send({
      code: 1003,
      message: "Tham số count sai định dạng",
      data: [],
    });
    return;
  }

  let listPost = await query(
    "SELECT * from post INNER JOIN user ON post.id_user = user.id_user WHERE id >= ? && id < ?",
    [index, +index + +count]
  );
  let listVideos = listPost.filter((item) => {
    return !!item.video;
  });
  if (listVideos.length === 0) {
    res.send({
      code: 9994,
      message: "Không còn dữ liệu",
      data: [],
    });
    return;
  }
  let new_items = await query("SELECT * from post WHERE id > ?", [last_id]);
  let new_items_video = new_items.filter((item) => {
    return !!item.video;
  });
  listPostResponse = await Promise.all(
    listVideos.map(async (item, index) => {
      let listLike = await query(
        "SELECT * from post_like WHERE id_post = ? AND id_user = ?",
        [item.id, id_user]
      );
      let isLiked = listLike.length === 0 ? false : true;
      let listBlock = await query(
        "SELECT * from block WHERE id_user = ? AND id_user_blocked = ?",
        [item.id_user, id_user]
      );
      let isBlocked = listBlock.length === 0 ? false : true;

      return {
        id: item.id,
        name: "",
        video: {
          url: item.video,
          thumb: item.thumb,
        },
        describe: item.described,
        created: item.created,
        like: item.post_like,
        comment: item.post_comment,
        isLiked,
        isBlocked,
        can_comment: item.can_comment === 1 ? true : false,
        can_edit: item.can_edit === 1 ? true : false,
        banned: item.banned === 1 ? true : false,
        state: item.state,
        author: {
          id: item.id_user,
          username: item.username,
          avatar: item.avatar,
        },
      };
    })
  );
  res.send({
    code: 1000,
    message: "Danh sách video",
    data: {
      post: listPostResponse,
      new_items: new_items_video.length,
      last_id: listVideos[listVideos.length - 1].id,
    },
  });
};
