const moment = require("moment/moment");
const isNumber = require("../common/isNumber");
const query = require("../common/query");

module.exports.get_list_conversation = async (req, res) => {
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
  console.log("+index + +count", +index + +count);

  let listConversation = await query(
    "SELECT * FROM conversation WHERE id_user_1 = ? || id_user_2 = ? && id >= ? && id < ?",
    [id_user, id_user, index, +index + +count]
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
    message: "Danh sách cuộc hội thoại",
    data: listConversationResponse,
    numNewMessage: listUnreadConversation.length,
  });
};

module.exports.get_conversation = async (req, res) => {
  let { partner_id, conversation_id, index, count } = req.query;
  const { id_user } = req.userInfo;

  if (index === undefined || index === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số index",
      data: [],
    });
    return;
  }
  if (conversation_id === undefined || conversation_id === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số conversation_id",
      data: [],
    });
    return;
  }
  if (partner_id === undefined || partner_id === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số partner_id",
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
  if (conversation_id < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số conversation_id không hợp lệ",
      data: [],
    });
    return;
  }
  if (partner_id < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số partner_id không hợp lệ",
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
  if (isNumber(conversation_id) === false) {
    res.send({
      code: 1003,
      message: "Tham số conversation_id sai định dạng",
      data: [],
    });
    return;
  }
  if (isNumber(partner_id) === false) {
    res.send({
      code: 1003,
      message: "Tham số partner_id sai định dạng",
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

  let listBlock = await query(
    "SELECT * FROM block WHERE id_user = ? && id_user_blocked = ?",
    [partner_id, id_user]
  );
  let is_blocked = listBlock.length > 0 ? 1 : 0;

  let listMessage = await query(
    "SELECT * FROM message  WHERE id_conversation = ? AND id >= ? AND id < ? ORDER BY created DESC",
    [conversation_id, index, +index + +count]
  );
  let listMessageResponse = await Promise.all(
    listMessage.map(async (item) => {
      console.log("item: ", item);
      let senderList = await query("SELECT * FROM user WHERE id_user = ?", [
        item.sender_id,
      ]);
      let sender = senderList[0];

      return {
        message: item.content,
        message_id: item.id,
        unread: item.unread,
        created: item.created,
        sender: {
          id: sender.id_user,
          username: sender.username,
          avatar: sender.avatar,
        },
      };
    })
  );

  console.log("listMessage: ", listMessage);
  res.send({
    code: 1000,
    message: "Danh sách tin nhắn",
    data: {
      conversation: listMessageResponse,
      is_blocked,
    },
  });
};

module.exports.set_read_message = async (req, res) => {
  let { partner_id, conversation_id } = req.query;
  const { id_user } = req.userInfo;
  if (partner_id === undefined || partner_id === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số partner_id",
      data: [],
    });
    return;
  }
  if (conversation_id === undefined || conversation_id === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số conversation_id",
      data: [],
    });
    return;
  }
  if (partner_id < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số partner_id không hợp lệ",
      data: [],
    });
    return;
  }
  if (conversation_id < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số conversation_id không hợp lệ",
      data: [],
    });
    return;
  }
  if (isNumber(partner_id) === false) {
    res.send({
      code: 1003,
      message: "Tham số partner_id sai định dạng",
      data: [],
    });
    return;
  }
  if (isNumber(conversation_id) === false) {
    res.send({
      code: 1003,
      message: "Tham số conversation_id sai định dạng",
      data: [],
    });
    return;
  }

  let partner = await query("SELECT * FROM user WHERE id_user = ?", [
    partner_id,
  ]);
  if (partner.length === 0) {
    res.send({
      code: 1004,
      message: "Không tìm thấy người dùng",
      data: [],
    });
    return;
  }

  let conversation = await query("SELECT * FROM conversation WHERE id = ?", [
    conversation_id,
  ]);
  if (conversation.length === 0) {
    res.send({
      code: 1004,
      message: "Không tìm thấy cuộc trò chuyện",
      data: [],
    });
    return;
  }

  let listMessage = await query(
    "SELECT * FROM message WHERE id_conversation = ? ORDER BY created DESC",
    [conversation_id]
  );

  let lastMessage = listMessage[0];

  if (partner_id == conversation[0].id_user_1) {
    await query("UPDATE message SET unread_user_2 = 0 WHERE id = ?", [
      lastMessage.id,
    ]);
  } else {
    await query("UPDATE message SET unread_user_1 = 0 WHERE id = ?", [
      lastMessage.id,
    ]);
  }
  res.send({
    code: 1000,
    message: "Đã đánh dấu là đã đọc",
    data: [],
  });
};

module.exports.delete_message = async (req, res) => {
  let { message_id, conversation_id, partner_id } = req.query;
  const { id_user } = req.userInfo;
  if (message_id === undefined || message_id === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số message_id",
      data: [],
    });
    return;
  }
  if (!conversation_id && !partner_id) {
    res.send({
      code: 1002,
      message: "Thiếu tham số conversation_id hoặc partner_id",
      data: [],
    });
    return;
  }
  if (message_id < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số message_id không hợp lệ",
      data: [],
    });
    return;
  }
  if (isNumber(message_id) === false) {
    res.send({
      code: 1003,
      message: "Tham số message_id sai định dạng",
      data: [],
    });
    return;
  }
  if (!!conversation_id) {
    if (conversation_id < 0) {
      res.send({
        code: 1004,
        message: "Giá trị tham số conversation_id không hợp lệ",
        data: [],
      });
      return;
    }
    if (isNumber(conversation_id) === false) {
      res.send({
        code: 1003,
        message: "Tham số conversation_id sai định dạng",
        data: [],
      });
      return;
    }
  }
  if (!!partner_id) {
    if (partner_id < 0) {
      res.send({
        code: 1004,
        message: "Giá trị tham số partner_id không hợp lệ",
        data: [],
      });
      return;
    }
    if (isNumber(partner_id) === false) {
      res.send({
        code: 1003,
        message: "Tham số partner_id sai định dạng",
        data: [],
      });
      return;
    }
  }
  if (!!conversation_id) {
    let conversation = await query("SELECT * FROM conversation WHERE id = ?", [
      conversation_id,
    ]);
    if (conversation.length === 0) {
      res.send({
        code: 1004,
        message: "Không tìm thấy cuộc trò chuyện",
        data: [],
      });
      return;
    }
  }
  if (!!partner_id) {
    let partner = await query("SELECT * FROM user WHERE id_user = ?", [
      partner_id,
    ]);
    if (partner.length === 0) {
      res.send({
        code: 1004,
        message: "Không tìm thấy partner",
        data: [],
      });
      return;
    }
  }
  let message = await query("SELECT * FROM message WHERE id = ?", [message_id]);
  if (message.length === 0) {
    res.send({
      code: 1004,
      message: "Không tìm thấy tin nhắn",
      data: [],
    });
    return;
  }
  await query("DELETE FROM message WHERE id = ?", [message_id]);
  res.send({
    code: 1000,
    message: "Đã xóa tin nhắn",
    data: [],
  });
};

module.exports.delete_conversation = async (req, res) => {
  let { conversation_id, partner_id } = req.query;
  let { id_user } = req.userInfo;
  if (conversation_id === undefined || conversation_id === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số conversation_id",
      data: [],
    });
  }
  if (partner_id === undefined || partner_id === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số partner_id",
      data: [],
    });
  }
  if (conversation_id < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số conversation_id không hợp lệ",
      data: [],
    });
    return;
  }
  if (isNumber(conversation_id) === false) {
    res.send({
      code: 1003,
      message: "Tham số conversation_id sai định dạng",
      data: [],
    });
    return;
  }
  if (partner_id < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số partner_id không hợp lệ",
      data: [],
    });
    return;
  }
  if (isNumber(partner_id) === false) {
    res.send({
      code: 1003,
      message: "Tham số partner_id sai định dạng",
      data: [],
    });
    return;
  }
  let conversation = await query("SELECT * FROM conversation WHERE id = ?", [
    conversation_id,
  ]);
  if (conversation.length === 0) {
    res.send({
      code: 1004,
      message: "Không tìm thấy cuộc trò chuyện",
      data: [],
    });
    return;
  }
  let partner = await query("SELECT * FROM user WHERE id_user = ?", [
    partner_id,
  ]);
  if (partner.length === 0) {
    res.send({
      code: 1004,
      message: "Không tìm thấy partner",
      data: [],
    });
    return;
  }
  await query("DELETE FROM message WHERE id_conversation = ?", [
    conversation_id,
  ]);
  await query("DELETE FROM conversation WHERE id = ?", [conversation_id]);
  res.send({
    code: 1000,
    message: "Đã xóa cuộc trò chuyện",
    data: [],
  });
};
