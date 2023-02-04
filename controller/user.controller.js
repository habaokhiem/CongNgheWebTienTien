const md5 = require("md5");
const moment = require("moment/moment");
const isValidUsername = require("../common/validateUsername");
const connection = require("../database");
const query = require("../common/query");
const isNumber = require("../common/isNumber");
const checkPasswordMatch = require("../common/checkPassword");
module.exports.changeInfoAfterSignup = (req, res) => {
  const { username, avatar } = req.query;
  const { SDT } = req.userInfo;
  if (username === undefined || username === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số số username",
      data: [],
    });
    return;
  }
  const isValid = isValidUsername(username);
  if (!isValid) {
    res.send({
      code: 1004,
      message: "Username không hợp lệ",
      data: [],
    });
    return;
  }
  if (username === SDT) {
    res.send({
      code: 1004,
      message: "Username không được trùng với số điện thoại",
      data: [],
    });
    return;
  }

  connection.query(
    "SELECT * from user WHERE username = ?",
    [username],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length !== 0) {
        res.send({
          code: 1003,
          message: "Username đã tồn tại",
          data: [],
        });
        return;
      }
      connection.query(
        "UPDATE user SET  avatar = ?, username = ? WHERE id_user = ?",
        [avatar, username, req.userInfo.id_user],
        function (error, results, fields) {
          if (error) throw error;
          res.send({
            code: 1000,
            message: "Sửa thành công!",
            data: {
              id: req.userInfo.id_user,
              username: username,
              phoneNumber: req.userInfo.SDT,
              created: moment().format("HH:mm:ss DD/MM/YYYY"),
              avatar: avatar,
              online: req.userInfo.online === 1 ? true : false,
            },
          });
        }
      );
    }
  );
};
module.exports.update_info = (req, res) => {
  const { username, name, password, email, SDT, avatar, online } = req.query;
  console.log("req.query: ", req.query);

  if (SDT.length === 10) {
    connection.query(
      "SELECT * from user  WHERE username != ?",
      [username],
      function (error, results, fields) {
        if (error) throw error;
        for (let i = 0; i < results.length; i++) {
          if (email === results[i].email || SDT === results[i].SDT) {
            res.send({
              status: 9996,
              message: "TK đã tồn tại",
              results: [],
            });
            return;
          }
        }
        const hashPassword = md5(password);
        connection.query(
          "UPDATE user SET name = ?, password = ?, email = ?, SDT = ?, avatar = ?, online = ? WHERE username = ?",
          [name, hashPassword, email, SDT, avatar, online, username],
          function (error, results, fields) {
            if (error) throw error;
            res.send({
              status: 1000,
              message: "Sửa thành công!",
              results: [],
            });
          }
        );
      }
    );
  } else {
    res.send({
      status: 9996,
      message: "Yêu cầu nhập lại SDT",
      results: [],
    });
  }
};

module.exports.get_list_blocks = async (req, res) => {
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
  let listBlocks = await query(
    "SELECT * FROM block INNER JOIN user ON block.id_user_blocked = user.id_user WHERE block.id_user = ? AND block.id >= ? AND block.id < ?",
    [id_user, index, +index + +count]
  );
  if (listBlocks.length === 0) {
    res.send({
      code: 1005,
      message: "Không có dữ liệu",
      data: [],
    });
    return;
  }
  let listBlockMap = listBlocks.map((item) => {
    return {
      id: item.id_user_blocked,
      name: item.username,
      avatar: item.avatar,
    };
  });
  res.send({
    code: 1000,
    message: "Danh sách chặn ",
    data: listBlockMap,
  });
};

module.exports.set_block = async (req, res) => {
  let { user_id, type } = req.query;
  let { id_user } = req.userInfo;
  if (user_id === undefined || user_id === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số user_id",
      data: [],
    });
    return;
  }
  if (type === undefined || type === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số type",
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
  if (isNumber(type) === false) {
    res.send({
      code: 1003,
      message: "Tham số type sai định dạng",
      data: [],
    });
    return;
  }
  if (type != 0 && type != 1) {
    res.send({
      code: 1004,
      message: "Tham số type không hợp lệ",
      data: [],
    });
    return;
  }
  let checkUser = await query("SELECT * FROM user WHERE id_user = ?", user_id);
  if (checkUser.length === 0) {
    res.send({
      code: 1005,
      message: "user_id không tồn tại",
      data: [],
    });
    return;
  }
  if (id_user == user_id) {
    res.send({
      code: 1006,
      message: "Không thể chặn chính mình",
      data: [],
    });
    return;
  }
  let isBlocked = await query(
    "SELECT * FROM block WHERE id_user = ? AND id_user_blocked = ?",
    [user_id, id_user]
  );
  if (isBlocked.length > 0) {
    res.send({
      code: 9995,
      message: "Người dùng này đã chặn bạn",
      data: [],
    });
    return;
  }
  let checkBlock = await query(
    "SELECT * FROM block WHERE id_user = ? AND id_user_blocked = ?",
    [id_user, user_id]
  );
  if (checkBlock.length === 0) {
    if (type == 1) {
      res.send({
        code: 1007,
        message: "Không thể hủy chặn khi chưa chặn",
        data: [],
      });
      return;
    }
    await query("INSERT INTO block (id_user, id_user_blocked) VALUES (?, ?)", [
      id_user,
      user_id,
    ]);
    res.send({
      code: 1000,
      message: "Chặn thành công",
      data: [],
    });
    return;
  }
  if (type == 0) {
    res.send({
      code: 1007,
      message: "Không thể chặn khi đã chặn",
      data: [],
    });
    return;
  }
  await query("DELETE FROM block WHERE id_user = ? AND id_user_blocked = ?", [
    id_user,
    user_id,
  ]);
  res.send({
    code: 1000,
    message: "Hủy chặn thành công",
    data: [],
  });
};

module.exports.change_password = async (req, res) => {
  let { password, new_password } = req.query;
  let { id_user, SDT } = req.userInfo;
  if (password === undefined || password === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số password",
      data: [],
    });
    return;
  }
  if (new_password === undefined || new_password === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số new_password",
      data: [],
    });
    return;
  }
  const isValidPassword = password.length >= 6 && password.length <= 10;
  if (!isValidPassword) {
    res.send({
      code: 9995,
      message: "Mật khẩu phải từ 6 đến 10 ký tự",
      data: [],
    });
    return;
  }
  const isValidNewPassword =
    new_password.length >= 6 && new_password.length <= 10;
  if (!isValidNewPassword) {
    res.send({
      code: 9995,
      message: "Mật khẩu mới phải từ 6 đến 10 ký tự",
      data: [],
    });
    return;
  }
  if (SDT === password) {
    res.send({
      code: 9995,
      message: "Mật khẩu không được trùng với số điện thoại",
      data: [],
    });
    return;
  }
  if (SDT === new_password) {
    res.send({
      code: 9995,
      message: "Mật khẩu mới không được trùng với số điện thoại",
      data: [],
    });
    return;
  }
  if (password === new_password) {
    res.send({
      code: 9995,
      message: "Mật khẩu mới không được trùng với mật khẩu cũ",
      data: [],
    });
    return;
  }
  if (checkPasswordMatch(password, new_password)) {
    res.send({
      code: 1003,
      message: "Mật khẩu mới không được trùng quá 80% với mật khẩu cũ",
      data: [],
    });
    return;
  }
  const hashPassword = md5(password);
  let user = await query(
    "SELECT * FROM user WHERE id_user = ? AND password = ?",
    [id_user, hashPassword]
  );
  if (user.length === 0) {
    res.send({
      code: 9995,
      message: "Mật khẩu không đúng",
      data: [],
    });
    return;
  }
  let new_hashPassword = md5(new_password);
  await query("UPDATE user SET password = ? WHERE id_user = ?", [
    new_hashPassword,
    id_user,
  ]);
  res.send({
    code: 1000,
    message: "Đổi mật khẩu thành công",
    data: [],
  });
  return;
};

module.exports.get_user_info = async (req, res) => {
  let { user_id } = req.query;
  let { id_user } = req.userInfo;
  if (user_id === undefined || user_id == id_user) {
    user_id = id_user;
  }
  if (!!user_id && isNumber(user_id) === false) {
    res.send({
      code: 1003,
      message: "Tham số user_id sai định dạng",
      data: [],
    });
    return;
  }
  if (!!user_id && user_id < 0) {
    res.send({
      code: 1004,
      message: "Giá trị tham số user_id không hợp lệ",
      data: [],
    });
    return;
  }
  let user = await query("SELECT * from user WHERE id_user = ?", [user_id]);
  if (user.length === 0) {
    res.send({
      code: 1005,
      message: "Tài khoản không tồn tại",
      data: [],
    });
    return;
  }
  let user_info = user[0];
  if (user_info.username === null) {
    res.send({
      code: 1005,
      message: "Tài khoản không tồn tại",
      data: [],
    });
    return;
  }
  let listBlocked = await query(
    "SELECT * from block  WHERE id_user = ? && id_user_blocked = ?",
    [user_id, id_user]
  );
  if (listBlocked.length > 0) {
    res.send({
      code: 1005,
      message: "Tài khoản không tồn tại",
      data: [],
    });
    return;
  }
  let listUserFriend = await query("SELECT * from friend  WHERE id_user = ?", [
    user_id,
  ]);
  let listFriend = await query(
    "SELECT * from friend  WHERE id_user = ? && id_friend = ?",
    [user_id, id_user]
  );
  let is_friend = listFriend.length > 0 ? true : false;
  res.send({
    code: 1000,
    message: "Lấy thông tin thành công",
    data: {
      id: user_info.id_user,
      username: user_info.username,
      created: user_info.created,
      description: user_info.description,
      avatar: user_info.avatar,
      cover_image: user_info.cover_image,
      link: user_info.link,
      address: user_info.address,
      city: user_info.city,
      country: user_info.country,
      listing: listUserFriend.length,
      is_friend: is_friend,
      online: user_info.online,
    },
  });
};

module.exports.set_user_info = async (req, res) => {
  let {
    username,
    description,
    avatar,
    address,
    city,
    country,
    cover_image,
    link,
  } = req.query;
  let { id_user } = req.userInfo;
  if (username == "") {
    res.send({
      code: 1003,
      message: "Tham số username không được để trống",
      data: [],
    });
    return;
  }
  if (!!username) {
    let isValidUserName = isValidUsername(username);
    if (isValidUserName === false) {
      res.send({
        code: 1003,
        message: "Tham số username không hợp lệ",
        data: [],
      });
      return;
    }
  }
  if (
    country.toLowerCase().includes("triều tiên") ||
    country.toLowerCase().includes("north korea") ||
    country.toLowerCase().includes("northkorea") ||
    country.toLowerCase().includes("trieu tien")
  ) {
    res.send({
      code: 1003,
      message: "Tham số country không hợp lệ, cần đăng xuất",
      data: [],
    });
    return;
  }
  if (description.length > 150) {
    res.send({
      code: 1003,
      message: "Tham số description quá dài",
      data: [],
    });
    return;
  }
  if (link.includes("vnhackers.com")) {
    res.send({
      code: 1003,
      message: "Đường dẫn không hợp lệ",
      data: [],
    });
    return;
  }
  let queryUpdate = "UPDATE user SET ";
  let queryUpdateValue = [];
  if (!!username) {
    queryUpdate += "username = ?,";
    queryUpdateValue.push(username);
  }
  if (!!description) {
    queryUpdate += "description = ?,";
    queryUpdateValue.push(description);
  }
  if (!!avatar) {
    queryUpdate += "avatar = ?,";
    queryUpdateValue.push(avatar);
  }
  if (!!address) {
    queryUpdate += "address = ?,";
    queryUpdateValue.push(address);
  }
  if (!!city) {
    queryUpdate += "city = ?,";
    queryUpdateValue.push(city);
  }
  if (!!country) {
    queryUpdate += "country = ?,";
    queryUpdateValue.push(country);
  }
  if (!!cover_image) {
    queryUpdate += "cover_image = ?,";
    queryUpdateValue.push(cover_image);
  }
  if (!!link) {
    queryUpdate += "link = ?,";
    queryUpdateValue.push(link);
  }
  queryUpdate = queryUpdate.slice(0, -1);
  queryUpdate += " WHERE id_user = ?";
  queryUpdateValue.push(id_user);
  await query(queryUpdate, queryUpdateValue);
  res.send({
    code: 1000,
    message: "Cập nhật thông tin thành công",
    data: {
      avatar: avatar ? `./${avatar}` : "",
      cover_image: cover_image ? `./${cover_image}` : "",
      link: link ? link : "",
      city: city ? city : "",
      country: country ? country : "",
    },
  });
};
