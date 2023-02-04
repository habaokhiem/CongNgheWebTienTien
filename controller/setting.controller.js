const moment = require("moment/moment");
const isNumber = require("../common/isNumber");
const query = require("../common/query");

module.exports.get_push_settings = async (req, res) => {
  let { id_user } = req.userInfo;
  let listSetting = await query("SELECT * from setting WHERE id_user = ?", [
    id_user,
  ]);
  if (listSetting.length === 0) {
    res.send({
      code: 1005,
      message: "Không tìm thấy cài đặt",
      data: [],
    });
    return;
  }
  let setting = listSetting[0];
  res.send({
    code: 1000,
    message: "Danh sách cài đăt",
    data: {
      like_comment: setting.like_comment,
      from_friends: setting.from_friends,
      requested_friend: setting.requested_friend,
      suggested_friend: setting.suggested_friend,
      birthday: setting.birthday,
      video: setting.video,
      report: setting.report,
      sound_on: setting.sound_on,
      notification_on: setting.notification_on,
      vibrant_on: setting.vibrant_on,
      led_on: setting.led_on,
    },
  });
};
module.exports.set_push_settings = async (req, res) => {
  let {
    like_comment,
    from_friends,
    requested_friend,
    suggested_friend,
    birthday,
    video,
    report,
    sound_on,
    notification_on,
    vibrant_on,
    led_on,
  } = req.query;
  let { id_user } = req.userInfo;
  if (
    !like_comment &&
    !from_friends &&
    !requested_friend &&
    !suggested_friend &&
    !birthday &&
    !video &&
    !report &&
    !sound_on &&
    !notification_on &&
    !vibrant_on &&
    !led_on
  ) {
    res.send({
      code: 1002,
      message: "Thiếu tham số",
      data: [],
    });
    return;
  }
  let listSetting = await query("SELECT * from setting WHERE id_user = ?", [
    id_user,
  ]);
  if (listSetting.length === 0) {
    res.send({
      code: 1005,
      message: "Không tìm thấy cài đặt",
      data: [],
    });
    return;
  }
  let setting = listSetting[0];
  if (!checkIsValidSetting(like_comment, "like_comment", res, setting)) {
    return;
  }
  if (!checkIsValidSetting(from_friends, "from_friends", res, setting)) {
    return;
  }
  if (
    !checkIsValidSetting(requested_friend, "requested_friend", res, setting)
  ) {
    return;
  }
  if (
    !checkIsValidSetting(suggested_friend, "suggested_friend", res, setting)
  ) {
    return;
  }
  if (!checkIsValidSetting(birthday, "birthday", res, setting)) {
    return;
  }
  if (!checkIsValidSetting(video, "video", res, setting)) {
    return;
  }
  if (!checkIsValidSetting(report, "report", res, setting)) {
    return;
  }
  if (!checkIsValidSetting(sound_on, "sound_on", res, setting)) {
    return;
  }
  if (!checkIsValidSetting(notification_on, "notification_on", res, setting)) {
    return;
  }
  if (!checkIsValidSetting(vibrant_on, "vibrant_on", res, setting)) {
    return;
  }
  if (!checkIsValidSetting(led_on, "led_on", res, setting)) {
    return;
  }

  let queryUpdate = "UPDATE setting SET ";
  let params = [];
  if (like_comment !== undefined && like_comment !== setting.like_comment) {
    queryUpdate += "like_comment = ?,";
    params.push(like_comment);
  }
  if (from_friends !== undefined) {
    queryUpdate += "from_friends = ?,";
    params.push(from_friends);
  }
  if (requested_friend !== undefined) {
    queryUpdate += "requested_friend = ?,";
    params.push(requested_friend);
  }
  if (suggested_friend !== undefined) {
    queryUpdate += "suggested_friend = ?,";
    params.push(suggested_friend);
  }
  if (birthday !== undefined) {
    queryUpdate += "birthday = ?,";
    params.push(birthday);
  }
  if (video !== undefined) {
    queryUpdate += "video = ?,";
    params.push(video);
  }
  if (report !== undefined) {
    queryUpdate += "report = ?,";
    params.push(report);
  }
  if (sound_on !== undefined) {
    queryUpdate += "sound_on = ?,";
    params.push(sound_on);
  }
  if (notification_on !== undefined) {
    queryUpdate += "notification_on = ?,";
    params.push(notification_on);
  }
  await query(queryUpdate.slice(0, -1) + " WHERE id_user = ?", [
    ...params,
    id_user,
  ]);
  res.send({
    code: 1000,
    message: "Cập nhật cài đặt thành công",
    data: [],
  });
};

let checkIsValidSetting = (setting, settingName, res, curSetting) => {
  if (!!setting) {
    if (!isNumber(setting)) {
      res.send({
        code: 1003,
        message: `Tham số ${settingName} sai định dạng`,
        data: [],
      });
      return false;
    }
    if (setting != 0 && setting != 1) {
      res.send({
        code: 1004,
        message: `Giá trị của tham số ${settingName} không hợp lệ`,
        data: [],
      });
      return false;
    }
    if (setting == curSetting[settingName]) {
      res.send({
        code: 1004,
        message: `Giá trị của tham số ${settingName} không thay đổi`,
        data: [],
      });
      return false;
    }
  }
  if (setting == "") {
    res.send({
      code: 1004,
      message: `Giá trị của tham số ${settingName} không hợp lệ`,
      data: [],
    });
    return false;
  }
  return true;
};

module.exports.set_devtoken = async (req, res) => {
  let { devtype, devtoken } = req.query;
  const { id_user } = req.userInfo;
  if (devtype === undefined || devtype === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số devtype",
      data: [],
    });
  }
  if (devtoken === undefined || devtoken === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số devtoken",
      data: [],
    });
  }
  if (devtype != 0 && devtype != 1) {
    res.send({
      code: 1003,
      message: "Tham số devtype sai định dạng",
      data: [],
    });
  }
  await query(
    "INSERT INTO devtoken SET id_user = ?, devtype = ?, devtoken = ?",
    [id_user, devtype, devtoken]
  );
  res.send({
    code: 1000,
    message: "Cập nhật devtoken thành công",
    data: [],
  });
};

module.exports.check_new_version = async (req, res) => {
  let { last_update } = req.query;
  let { id_user, active } = req.userInfo;
  if (last_update === undefined || last_update === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số last_update",
      data: [],
    });
  }
  let listVersion = await query("SELECT * FROM version");
  let newVersion = listVersion[0];
  let require = newVersion == last_update ? 0 : 1;
  const listNotification = await query(
    "SELECT * from notification WHERE id_user = ? AND read_noti = 0",
    [id_user]
  );
  let listConversation = await query(
    "SELECT * FROM conversation WHERE id_user_1 = ? || id_user_2 = ?",
    [id_user, id_user]
  );
  if (listConversation.length === 0) {
    res.send({
      code: 1005,
      message: "Không có cuộc hội thoại nào",
      data: [],
    });
  }
  let listConversationResponse = await Promise.all(
    listConversation.map(async (item) => {
      let listMessage = await query(
        "SELECT * FROM message WHERE id_conversation = ? ORDER BY created DESC",
        [item.id]
      );
      let lastMessage = listMessage.length > 0 ? listMessage[0] : {};
      let partner_id =
        item.id_user_1 === id_user ? item.id_user_2 : item.id_user_1;
      let partnerList = await query("SELECT * FROM user WHERE id_user = ?", [
        partner_id,
      ]);
      let partner = partnerList.length > 0 ? partnerList[0] : {};
      return {
        id: item.id,
        Partner: {
          id: partner.id_user,
          username: partner.username,
          avatar: partner.avatar,
        },
        LastMessage:
          listMessage.length === 0
            ? {}
            : {
                message: lastMessage.content,
                created: lastMessage.created,
                unread:
                  item.id_user_1 === id_user
                    ? lastMessage.unread_user_1
                    : lastMessage.unread_user_2,
              },
      };
    })
  );

  let listUnreadConversation = listConversationResponse.filter((item) => {
    return !!item.LastMessage && item.LastMessage.unread === 1;
  });

  res.send({
    code: 1000,
    message: "Lấy thông tin phiên bản thành công",
    data: {
      Version: {
        version: newVersion.version,
        require,
        url: `./${newVersion.version}.apk`,
      },
      User: {
        id: id_user,
        active,
      },
      badge: listNotification.length,
      unread_message: listUnreadConversation.length,
      now: newVersion.version,
    },
  });
};
