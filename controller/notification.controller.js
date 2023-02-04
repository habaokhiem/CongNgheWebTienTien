const moment = require("moment/moment");
const isNumber = require("../common/isNumber");
const query = require("../common/query");

module.exports.get_notification = async (req, res) => {
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
  const listNotification = await query(
    "SELECT * from notification WHERE id >= ? && id < ? AND id_user = ? AND read_noti = 0",
    [index, +index + +count, id_user]
  );
  if (listNotification.length === 0) {
    res.send({
      code: 1001,
      message: "Không có thông báo",
      data: [],
    });
    return;
  }
  console.log("listNotification: ", listNotification);
  filterListNotification = listNotification.filter((item) => {
    return (
      !!item.title &&
      !!item.id &&
      !!item.created &&
      ((item.group == 1 && !!item.object_id) || item.group == 0)
    );
  });
  let listNotificationResponse = listNotification.map((item) => {
    return {
      type: item.type,
      object_id: item.object_id,
      title: item.title,
      notification_id: item.id,
      created: item.created,
      avatar: item.avatar,
      group: item.group,
      read: item.read,
    };
  });
  res.send({
    code: 1000,
    message: "Danh sách thông báo",
    data: {
      listNotification: listNotificationResponse,
      last_update: moment().format("YYYY-MM-DD HH:mm:ss"),
      badge: listNotificationResponse.length,
    },
  });
};

module.exports.set_read_notification = async (req, res) => {
  let { notification_id } = req.query;
  const { id_user } = req.userInfo;
  if (notification_id === undefined || notification_id === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số notification_id",
      data: [],
    });
    return;
  }
  if (isNumber(notification_id) === false) {
    res.send({
      code: 1003,
      message: "Tham số notification_id sai định dạng",
      data: [],
    });
    return;
  }
  if (notification_id < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số notification_id không hợp lệ",
      data: [],
    });
    return;
  }
  const listUnreadNotification = await query(
    "SELECT * from notification WHERE id = ? AND id_user = ?",
    [notification_id, id_user]
  );
  if (listUnreadNotification.length === 0) {
    res.send({
      code: 1005,
      message: "Thông báo không tồn tại",
      data: [],
    });
    return;
  }
  if (listUnreadNotification[0].read_noti === 1) {
    res.send({
      code: 1006,
      message: "Thông báo đã được đọc",
      data: [],
    });
    return;
  }
  await query(
    "UPDATE notification SET read_noti = 1 WHERE id = ? AND id_user = ?",
    [notification_id, id_user]
  );
  const listNotification = await query(
    "SELECT * from notification WHERE id_user = ? AND read_noti = 0",
    [id_user]
  );
  res.send({
    code: 1000,
    message: "Đã đọc thông báo",
    data: {
      badge: listNotification.length,
      last_update: moment().format("YYYY-MM-DD HH:mm:ss"),
    },
  });
};
