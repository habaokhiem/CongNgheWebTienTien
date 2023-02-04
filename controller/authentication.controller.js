const connection = require("../database");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const UUID = require("uuid");
const isValidPhone = require("../common/validatePhoneNumber");
const generateCode = require("../common/generateCode");
module.exports.signUp = (req, res) => {
  const { phoneNumber, password, uuid } = req.query;
  if (phoneNumber === undefined || phoneNumber === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số số điện thoại",
      data: [],
    });
    return;
  }
  if (password === undefined || password === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số mật khẩu",
      data: [],
    });
    return;
  }
  if (uuid === undefined || uuid === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số uuid",
      data: [],
    });
    return;
  }
  const isValidPhoneNumber = isValidPhone(phoneNumber);
  if (!isValidPhoneNumber) {
    res.send({
      code: 9994,
      message: "Số điện thoại không đúng định dạng",
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
  if (phoneNumber === password) {
    res.send({
      code: 9995,
      message: "Mật khẩu không được trùng với số điện thoại",
      data: [],
    });
    return;
  }
  // const deviceUUID = UUID.v4();
  // console.log("deviceUUID: ", deviceUUID);
  connection.query("SELECT * from user", function (error, results, fields) {
    if (error) throw error;
    for (let i = 0; i < results.length; i++) {
      if (phoneNumber === results[i].SDT) {
        res.send({
          code: 9996,
          message: "User existed",
          data: [],
        });
        return;
      }
    }
    const hashPassword = md5(password);
    connection.query(
      "INSERT INTO user (password, SDT, online, uuid, isVerified, created, active) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [hashPassword, phoneNumber, 0, uuid, 0, new Date(), 1],
      function (error, results, fields) {
        if (error) throw error;
        const verifyCode = generateCode(phoneNumber);
        connection.query(
          "INSERT INTO verify (phone_number, code) VALUES (?, ?)",
          [phoneNumber, verifyCode],
          function (error, results, fields) {
            if (error) throw error;
          }
        );
        res.send({
          code: 1000,
          message: "Tạo thành công!",
          data: [],
        });
      }
    );
  });
};
module.exports.login = (req, res) => {
  const { phoneNumber, password, deviceID } = req.query;
  if (phoneNumber === undefined || phoneNumber === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số số điện thoại",
      data: [],
    });
    return;
  }
  if (password === undefined || password === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số mật khẩu",
      data: [],
    });
    return;
  }
  if (deviceID === undefined || deviceID === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số deviceID",
      data: [],
    });
    return;
  }
  const isValidPhoneNumber = isValidPhone(phoneNumber);
  if (!isValidPhoneNumber) {
    res.send({
      code: 9994,
      message: "Số điện thoại không đúng định dạng",
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
  if (phoneNumber === password) {
    res.send({
      code: 9995,
      message: "Mật khẩu không được trùng với số điện thoại",
      data: [],
    });
    return;
  }
  const hashPassword = md5(password);
  connection.query("SELECT * from user", function (error, results, fields) {
    if (error) throw error;
    for (let i = 0; i < results.length; i++) {
      if (phoneNumber === results[i].SDT) {
        if (hashPassword === results[i].password) {
          const payload = {
            username: results[i].username,
            name: results[i].name,
            email: results[i].email,
            SDT: results[i].SDT,
            avatar: results[i].avatar,
          };
          const payloadToken = {
            id: results[i].id_user,
            deviceID,
          };
          const token = jwt.sign(payloadToken, process.env.ACCESS_TOKEN, {
            expiresIn: 60 * 60 * 24,
          });
          const userResponse = {
            // userInfo: payload,
            id: results[i].id_user,
            username: results[i].username,
            token,
            avatar: results[i].avatar,
            active: 1,
          };
          connection.query(
            "UPDATE user SET online = ?, token = ? WHERE SDT = ?",
            [1, token, phoneNumber],
            function (error, results, fields) {
              if (error) throw error;
            }
          );
          connection.query(
            "INSERT INTO token VALUES (?)",
            [token],
            function (error, results, fields) {
              if (error) throw error;
            }
          );
          connection.query(
            "INSERT INTO setting (id_user, like_comment,from_friends, requested_friend,suggested_friend,birthday,video,report,sound_on,notification_on,vibrant_on,led_on) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [results[i].id_user, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            function (error, results, fields) {
              if (error) throw error;
            }
          );

          res.send({
            code: 1000,
            message: "Đăng nhập thành công",
            data: userResponse,
          });
          return;
        } else {
          res.send({
            code: 9996,
            message: "Sai mật khẩu",
            data: [],
          });
          return;
        }
      }
    }
    res.send({
      status: 9996,
      message: "SĐT chưa được đăng ký",
      results: [],
    });
  });
};
module.exports.logout = (req, res) => {
  // const { token } = req.query;
  const token = req.header("token");

  connection.query(
    "DELETE from token WHERE token = ?",
    [token],
    function (error, results, fields) {
      if (error) throw error;
      connection.query(
        "UPDATE user SET online = ?, token = ? WHERE token = ?",
        [0, null, token],
        function (error, results, fields) {
          if (error) throw error;
          res.send({
            status: 1000,
            message: "Đăng xuất thành công!",
            results: [],
          });
        }
      );
    }
  );
};

module.exports.getVerifyCode = (req, res) => {
  const { phoneNumber } = req.query;
  if (phoneNumber === undefined || phoneNumber === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số số điện thoại",
      data: [],
    });
    return;
  }
  const isValidPhoneNumber = isValidPhone(phoneNumber);
  if (!isValidPhoneNumber) {
    res.send({
      code: 9994,
      message: "Số điện thoại không đúng định dạng",
      data: [],
    });
    return;
  }
  connection.query("SELECT * from user", function (error, results, fields) {
    if (error) throw error;
    for (let i = 0; i < results.length; i++) {
      if (phoneNumber === results[i].SDT) {
        if (results[i].isVerified == 1) {
          res.send({
            code: 1010,
            message: "Số điện thoại đã được xác thực",
            data: [],
          });
          return;
        }

        connection.query(
          "SELECT * from verify WHERE phone_number = ?",
          [phoneNumber],
          function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
              const verifyCode = results[0].code;
              const timeGetCode = results[0].time_get_code;
              if (timeGetCode !== null) {
                const timeNow = new Date();
                const timeDiff = timeNow - timeGetCode;
                if (timeDiff < 120 * 1000) {
                  res.send({
                    code: 1010,
                    message: `Đợi ${
                      120 - Math.floor(timeDiff / 1000)
                    } giây để lấy lại mã xác thực`,
                    data: [],
                  });
                  return;
                }
              }
              connection.query(
                "UPDATE verify SET time_get_code = ? WHERE phone_number = ?",
                [new Date(), phoneNumber],
                function (error, results, fields) {
                  if (error) throw error;
                  res.send({
                    code: 1000,
                    message: "Lấy mã xác thực thành công",
                    data: {
                      code: verifyCode,
                    },
                  });
                }
              );
            } else {
              res.send({
                code: 9995,
                message: "Số điện thoại chưa được đăng ký",
                data: [],
              });
              return;
            }
          }
        );
        return;
      }
    }
    res.send({
      code: 9995,
      message: "Số điện thoại chưa được đăng ký",
      data: [],
    });
  });
};

module.exports.checkVerifyCode = (req, res) => {
  const { phoneNumber, code } = req.query;
  if (phoneNumber === undefined || phoneNumber === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số số điện thoại",
      data: [],
    });
    return;
  }
  if (code === undefined || code === "") {
    res.send({
      code: 1002,
      message: "Thiếu tham số mã xác thực",
      data: [],
    });
    return;
  }
  const isValidPhoneNumber = isValidPhone(phoneNumber);
  if (!isValidPhoneNumber) {
    res.send({
      code: 9994,
      message: "Số điện thoại không đúng định dạng",
      data: [],
    });
    return;
  }
  console.log("req: ", req.query);
  connection.query(
    "SELECT * from verify where phone_number = ?",
    [phoneNumber],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("results[0].code: ", results[0].code);
        console.log("code: ", code);
        if (results[0].code != code) {
          res.send({
            code: 9996,
            message: "Mã xác thực không hợp lệ",
            data: [],
          });
          return;
        }
        connection.query(
          "UPDATE user SET isVerified = ? where SDT = ?",
          [1, phoneNumber],
          function (error, results, fields) {
            if (error) throw error;
            res.send({
              code: 1000,
              message: "Mã xác nhận hợp lệ",
              data: [],
            });
          }
        );
      } else {
        res.send({
          code: 9995,
          message: "Số điện thoại chưa được đăng ký",
          data: [],
        });
      }
    }
  );
};
