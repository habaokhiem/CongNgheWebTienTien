const moment = require("moment/moment");
const removeVietnameseTones = require("../common/convert");
const isNumber = require("../common/isNumber");
const query = require("../common/query");
const { connect } = require("../database");
const connection = require("../database");

module.exports.get_requested_friends = async (req, res) => {
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
  let listRequest = await query(
    "SELECT * from friend_request INNER JOIN user ON friend_request.id_user_request = user.id_user WHERE friend_request.id_user = ?",
    [id_user]
  );
  if (listRequest.length === 0) {
    res.send({
      code: 1005,
      message: "Không có request nào",
      data: [],
    });
    return;
  }
  let listRequestResponse = await Promise.all(
    listRequest.map(async (item) => {
      let listFriend = await query("SELECT * from friend  WHERE id_user = ?", [
        id_user,
      ]);
      let listFriendMap = listFriend.map((item) => item.id_friend);
      let listRequesterFriend = await query(
        "SELECT * from friend  WHERE id_user = ?",
        [item.id_user]
      );
      let listRequesterFriendMap = listRequesterFriend.map(
        (item) => item.id_friend
      );
      let sameFriends = listFriendMap.filter((item) => {
        return listRequesterFriendMap.includes(item) && item != id_user;
      });
      return {
        id: item.id_user,
        username: item.username,
        avatar: item.avatar,
        same_friends: sameFriends.length,
        created: item.created,
      };
    })
  );
  res.send({
    code: 1000,
    message: "Lấy danh sách request thành công",
    data: {
      request: listRequestResponse,
      total: listRequest.length,
    },
  });
};

module.exports.get_user_friends = async (req, res) => {
  const { user_id, index, count } = req.query;
  const { id_user } = req.userInfo;
  if (index === undefined || index === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số index",
      data: [],
    });
    return;
  }
  if (user_id === undefined || user_id === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số user_id",
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
  if (user_id < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số user_id không hợp lệ",
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
  if (isNumber(user_id) === false) {
    res.send({
      code: 1003,
      message: "Tham số user_id sai định dạng",
      data: [],
    });
    return;
  }
  let user = await query("SELECT * from user WHERE id_user = ?", [user_id]);
  if (user.length === 0) {
    res.send({
      code: 1005,
      message: "user_id không tồn tại",
      data: [],
    });
  }

  let listUserFriend = await query(
    "SELECT * from friend INNER JOIN user ON friend.id_friend = user.id_user WHERE friend.id_user = ?",
    [user_id]
  );
  console.log("listUserFriend: ", listUserFriend);
  if (listUserFriend.length === 0) {
    res.send({
      code: 1005,
      message: "Không có bạn bè nào",
      data: [],
    });
  }
  let listUserFriendResponse = await Promise.all(
    listUserFriend.map(async (item) => {
      let listFriend = await query("SELECT * from friend  WHERE id_user = ?", [
        id_user,
      ]);
      let listFriendMap = listFriend.map((friend) => friend.id_friend);
      let itemFriend = await query("SELECT * from friend  WHERE id_user = ?", [
        item.id_friend,
      ]);
      let listItemFriendMap = itemFriend.map((friend) => friend.id_friend);
      let sameFriends = listFriendMap.filter((friendMap) => {
        return listItemFriendMap.includes(friendMap);
      });
      return item.id_friend == id_user
        ? {
            id: item.id_friend,
            username: item.username,
            avatar: item.avatar,
            created: item.created,
          }
        : {
            id: item.id_friend,
            username: item.username,
            avatar: item.avatar,
            same_friends: sameFriends.length,
            created: item.created,
          };
    })
  );
  res.send({
    code: 1000,
    message: "Lấy danh sách bạn bè thành công",
    data: {
      friends: listUserFriendResponse,
      total: listUserFriend.length,
    },
  });
};

module.exports.set_accept_friend = async (req, res) => {
  let { user_id, is_accept } = req.query;
  const { id_user } = req.userInfo;
  if (user_id === undefined || user_id === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số user_id",
      data: [],
    });
    return;
  }
  if (user_id < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số user_id không hợp lệ",
      data: [],
    });
    return;
  }
  if (isNumber(user_id) === false) {
    res.send({
      code: 1003,
      message: "Tham số user_id sai định dạng",
      data: [],
    });
    return;
  }
  if (user_id == id_user) {
    res.send({
      code: 1004,
      message: "Không thể kết bạn với chính mình",
      data: [],
    });
    return;
  }
  let user = await query("SELECT * from user WHERE id_user = ?", [user_id]);
  if (user.length === 0) {
    res.send({
      code: 1005,
      message: "user_id không tồn tại",
      data: [],
    });
    return;
  }
  if (is_accept === undefined || is_accept === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số is_accept",
      data: [],
    });
    return;
  }
  if (is_accept != 0 && is_accept != 1) {
    res.send({
      code: 1004,
      message: "Giá trị tham số is_accept không hợp lệ",
      data: [],
    });
    return;
  }
  let request = await query(
    "SELECT * from friend_request WHERE id_user = ? AND id_user_request = ?",
    [id_user, user_id]
  );
  if (request.length === 0) {
    res.send({
      code: 1005,
      message: "Yêu cầu kết bạn này không tồn tại",
      data: [],
    });
    return;
  }
  if (is_accept == 1) {
    let numberOfFriend = await query("SELECT * from friend WHERE id_user = ?", [
      id_user,
    ]);
    if (numberOfFriend.length >= 100) {
      res.send({
        code: 9994,
        message: "Bạn đã đạt giới hạn 100 bạn bè",
        data: [],
      });
      return;
    }
    let friend = await query(
      "SELECT * from friend WHERE id_user = ? AND id_friend = ?",
      [id_user, user_id]
    );
    if (friend.length === 0) {
      const curTime = moment().format("YYYY-MM-DD HH:mm:ss");
      await query(
        "INSERT INTO friend (id_user, id_friend, created) VALUES (?, ?, ?)",
        [id_user, user_id, curTime]
      );
      await query(
        "INSERT INTO friend (id_user, id_friend, created) VALUES (?, ?, ?)",
        [user_id, id_user, curTime]
      );
    } else {
      res.send({
        code: 1005,
        message: "Bạn đã là bạn bè của người này",
        data: [],
      });
      return;
    }
  }
  await query(
    "DELETE FROM friend_request WHERE id_user = ? AND id_user_request = ?",
    [user_id, id_user]
  );
  await query(
    "DELETE FROM friend_request WHERE id_user = ? AND id_user_request = ?",
    [id_user, user_id]
  );
  let requestedFriends = await query(
    "SELECT * from friend_request WHERE id_user_request = ?",
    [id_user]
  );
  res.send({
    code: 1000,
    message:
      is_accept == 1
        ? "Đồng ý kết bạn thành công"
        : "Từ chối kết bạn thành công",
    data: {
      requested_friends: requestedFriends.length,
    },
  });
};

module.exports.get_list_suggested_friends = async (req, res) => {
  let { index, count } = req.query;
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
  let listFriend = await query("SELECT * from friend  WHERE id_user = ?", [
    id_user,
  ]);
  let listFriendMap = listFriend.map((item) => item.id_friend);
  console.log("listFriendMap: ", listFriendMap);
  let listAllUser = await query("SELECT * from user ");

  let listAllUserMap = await Promise.all(
    listAllUser.map(async (item) => {
      let listUserFriend = await query(
        "SELECT * from friend  WHERE id_user = ?",
        [item.id_user]
      );
      let listUserFriendMap = listUserFriend.map((item) => item.id_friend);
      let sameFriend = listUserFriendMap.filter((item) =>
        listFriendMap.includes(item)
      );
      return {
        user_id: item.id_user,
        username: item.username,
        avatar: item.avatar,
        sameFriend: sameFriend.length,
      };
    })
  );
  let listBlock = await query(
    "SELECT * from block WHERE id_user = ? OR id_user_blocked = ?",
    [id_user, id_user]
  );
  let listBlockMap = listBlock.map((item) => item.id_user);
  let listBlockedMap = listBlock.map((item) => item.id_user_blocked);
  let listRequest = await query(
    "SELECT * from friend_request WHERE id_user = ?",
    [id_user]
  );
  let listRequestMap = listRequest.map((item) => item.id_user_request);
  let suggestedFriends = listAllUserMap
    .filter((item) => {
      return (
        item.sameFriend > 0 &&
        item.user_id !== id_user &&
        !listFriendMap.includes(`${item.user_id}`) &&
        !listBlockMap.includes(item.user_id) &&
        !listBlockedMap.includes(item.user_id) &&
        !listRequestMap.includes(`${item.user_id}`)
      );
    })
    .sort((a, b) => b.sameFriend - a.sameFriend);

  res.send({
    code: 1000,
    message: "Lấy danh sách bạn bè gợi ý thành công",
    data: {
      list_users: suggestedFriends,
    },
  });
};
module.exports.set_request_friend = async (req, res) => {
  let { user_id } = req.query;
  let { id_user } = req.userInfo;
  if (user_id === undefined || user_id === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số user_id",
      data: [],
    });
    return;
  }
  if (isNumber(user_id) === false) {
    res.send({
      code: 1003,
      message: "Tham số user_id sai định dạng",
      data: [],
    });
    return;
  }
  if (user_id < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số user_id không hợp lệ",
      data: [],
    });
    return;
  }
  if (user_id == id_user) {
    res.send({
      code: 1005,
      message: "Không thể gửi yêu cầu kết bạn cho chính mình",
      data: [],
    });
    return;
  }
  let userList = await query("SELECT * from user WHERE id_user = ?", [user_id]);
  if (userList.length === 0) {
    res.send({
      code: 1006,
      message: "Không tồn tại user_id trong hệ thống",
      data: [],
    });
    return;
  }
  let listFriend = await query("SELECT * from friend  WHERE id_user = ?", [
    id_user,
  ]);
  console.log("listFriend: ", listFriend);
  if (listFriend.length > 500) {
    res.send({
      code: 9994,
      message: "Bạn đã có số lượng bạn bè tối đa",
      data: [],
    });
    return;
  }
  let curRequest = await query(
    "SELECT * from friend_request WHERE id_user = ? AND id_user_request = ?",
    [user_id, id_user]
  );
  if (curRequest.length > 0) {
    await query(
      "DELETE FROM friend_request WHERE id_user = ? AND id_user_request = ?",
      [user_id, id_user]
    );
  }
  await query(
    "INSERT INTO friend_request(id_user, id_user_request, created) VALUES(?, ?, ?)",
    [user_id, id_user, new Date()]
  );
  let listRequest = await query(
    "SELECT * from friend_request WHERE id_user_request = ?",
    [id_user]
  );
  res.send({
    code: 1000,
    message: "Gửi yêu cầu kết bạn thành công",
    data: {
      requested_friends: listRequest.length,
    },
  });
  return;
};
