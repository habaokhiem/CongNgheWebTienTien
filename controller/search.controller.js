const moment = require("moment/moment");
const removeVietnameseTones = require("../common/convert");
const isNumber = require("../common/isNumber");
const query = require("../common/query");
const { connect } = require("../database");
const connection = require("../database");

module.exports.search = async (req, res) => {
  const { keyword, index, count } = req.query;
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
  if (keyword === undefined || keyword === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số keyword",
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
  const listSearch = await query(
    "SELECT * from post INNER JOIN user ON post.id_user = user.id_user WHERE id >= ? && id < ?",
    [index, +index + +count]
  );
  let firstPrioritySearch = listSearch.filter((item) => {
    return (
      item.described.toLowerCase().includes(keyword.toLowerCase()) ||
      item.username.toLowerCase().includes(keyword.toLowerCase())
    );
  });
  let secondPrioritySearch = listSearch.filter((item) => {
    let listWords = keyword.split(" ");
    let isIncludeAll = true;
    for (word of listWords) {
      if (
        !item.described.toLowerCase().includes(word.toLowerCase()) &&
        !item.username.toLowerCase().includes(word.toLowerCase())
      ) {
        isIncludeAll = false;
        break;
      }
    }
    return isIncludeAll;
  });
  let thirdPrioritySearch = listSearch.filter((item) => {
    let listWords = keyword.split(" ");
    let percentMatch = listWords.length / 5;
    let numberMatched = 0;
    for (word of listWords) {
      if (
        item.described.toLowerCase().split(" ").includes(word.toLowerCase()) ||
        item.username.toLowerCase().split(" ").includes(word.toLowerCase())
      ) {
        numberMatched++;
      }
    }
    if (numberMatched >= percentMatch) {
      return true;
    }
    return false;
  });
  let fourthPrioritySearch = listSearch.filter((item) => {
    let listWords = keyword.toLowerCase().split(" ");
    let listWordUnsigned = listWords.map((item) => {
      return removeVietnameseTones(item);
    });
    let listWordDescribedUnsigned = item.described
      .toLowerCase()
      .split(" ")
      .map((item) => {
        return removeVietnameseTones(item);
      });
    let listWordUsernameUnsigned = item.username
      .toLowerCase()
      .split(" ")
      .map((item) => {
        return removeVietnameseTones(item);
      });
    for (word of listWordUnsigned) {
      if (
        listWordDescribedUnsigned.includes(word) ||
        listWordUsernameUnsigned.includes(word)
      ) {
        return true;
      }
    }
    return false;
  });
  let mergeData = [];
  console.log("firstPrioritySearch: ", firstPrioritySearch);
  mergeData = [...mergeData, ...firstPrioritySearch];
  console.log("secondPrioritySearch: ", secondPrioritySearch);
  let listDifferent = secondPrioritySearch.filter((item) => {
    return !mergeData.includes(item);
  });
  mergeData = [...mergeData, ...listDifferent];
  console.log("thirdPrioritySearch: ", thirdPrioritySearch);
  listDifferent = thirdPrioritySearch.filter((item) => {
    return !mergeData.includes(item);
  });
  mergeData = [...mergeData, ...listDifferent];
  console.log("fourthPrioritySearch: ", fourthPrioritySearch);
  listDifferent = fourthPrioritySearch.filter((item) => {
    return !mergeData.includes(item);
  });
  mergeData = [...mergeData, ...listDifferent];
  let dataResponse = await Promise.all(
    mergeData.map(async (item) => {
      let listImage = await query("SELECT * from image WHERE id_post = ?", [
        item.id,
      ]);
      let imageResponse = listImage.map((item) => {
        return item.link_image;
      });
      let listLike = await query(
        "SELECT * from post_like WHERE id_post = ? AND id_user = ?",
        [item.id, id_user]
      );
      let isLike = listLike.length === 0 ? false : true;
      return {
        id: item.id,
        image: imageResponse,
        video: {
          thumb: item.thumb,
          url: item.video,
        },
        like: item.post_like,
        comment: item.post_comment,
        is_liked: isLike,
        author: {
          id: item.id_user,
          username: item.username,
          avatar: item.avatar,
        },
        described: item.described,
      };
    })
  );
  await query(
    "INSERT INTO search (keyword, id_user, created) VALUES (?, ?, ?)",
    [keyword, id_user, moment().format("YYYY-MM-DD HH:mm:ss")]
  );
  res.send({
    code: 1000,
    message: "Danh sách tìm kiếm",
    data: dataResponse,
  });
};
module.exports.get_saved_search = async (req, res) => {
  const { index, count } = req.query;
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
  let listSearch = await query(
    "SELECT id, keyword, created from search WHERE id_user = ? AND id >= ? && id < ? ORDER BY created DESC",
    [id_user, index, +index + +count]
  );
  if (listSearch.length === 0) {
    res.send({
      code: 9992,
      message: "Không tìm thấy kết quả nào",
      data: [],
    });
    return;
  }
  console.log("listSearch: ", listSearch);
  res.send({
    code: 1000,
    message: "Danh sách tìm kiếm",
    data: listSearch,
  });
};
module.exports.del_saved_search = async (req, res) => {
  const { search_id, all } = req.query;
  const { id_user } = req.userInfo;
  if (
    (search_id === undefined || search_id === "") &&
    (all === undefined || all === "")
  ) {
    res.send({
      code: 1002,
      message: "Thiếu tham số search_id và all",
      data: [],
    });
    return;
  }
  if ((search_id === undefined || search_id === "") && !!all && all == 0) {
    res.send({
      code: 1002,
      message: "Thiếu tham số search_id",
      data: [],
    });
    return;
  }
  if (all === undefined || all === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số all",
      data: [],
    });
    return;
  }

  if (search_id < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số search_id không hợp lệ",
      data: [],
    });
    return;
  }
  if (all != 0 && all != 1) {
    res.send({
      code: 1004,
      message: "Giá trị tham số all không hợp lệ",
      data: [],
    });
    return;
  }
  if (!!search_id && isNumber(search_id) === false) {
    res.send({
      code: 1003,
      message: "Tham số search_id sai định dạng",
      data: [],
    });
    return;
  }
  if (isNumber(all) === false) {
    res.send({
      code: 1003,
      message: "Tham số all sai định dạng",
      data: [],
    });
    return;
  }
  let listSearch = [];
  if (all == 0) {
    listSearch = await query(
      "SELECT * from search WHERE id_user = ? AND id = ?",
      [id_user, search_id]
    );
    if (listSearch.length == 0) {
      res.send({
        code: 9992,
        message: "search_id không tồn tại",
        data: [],
      });
      return;
    }
  }
  if (all == 1) {
    listSearch = await query("SELECT * from search WHERE id_user = ?", [
      id_user,
    ]);
    if (listSearch.length == 0) {
      res.send({
        code: 9992,
        message: "Không có dữ liệu tìm kiếm nào",
        data: [],
      });
      return;
    }
  }

  if (all == 0) {
    await query("DELETE FROM search WHERE id = ? AND id_user = ?", [
      search_id,
      id_user,
    ]);
  }
  if (all == 1) {
    await query("DELETE FROM search WHERE id_user = ?", [id_user]);
  }
  res.send({
    code: 1000,
    message: "Xóa tìm kiếm thành công",
    data: [],
  });
};
