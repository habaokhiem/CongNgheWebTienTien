const connection = require("../database");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("token");

  if (!token)
    return res.status(401).send({
      message: "Truy cập thất bại",
      token_invalid: true,
      payload: null,
      error: true,
    });
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN);
    connection.query(
      "SELECT * from user WHERE token = ?",
      [token],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length === 0) {
          res.send({
            status: 401,
            message: "Token không tồn tại.",
            results: [],
          });
          return;
        }
        req.userInfo = results[0];
        next();
      }
    );
    // connection.query("SELECT * from token", function (error, results, fields) {
    //   if (error) throw error;
    //   for (let i = 0; i < results.length; i++) {
    //     if (token === results[i].token) {
    //       next();
    //       return;
    //     }
    //   }
    //   res.send({
    //     status: 401,
    //     message: "Token không tồn tại.",
    //     results: [],
    //   });
    // });
  } catch (err) {
    return res.status(403).send({
      message: "Invalid Token",
      token_invalid: true,
      payload: null,
      error: true,
    });
  }
};

module.exports = verifyToken;
