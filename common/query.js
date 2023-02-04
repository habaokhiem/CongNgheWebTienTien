const connection = require("../database");

async function query(query, params = []) {
  let result = await connection
    .promise()
    .query(query, params, function (error, results, fields) {
      if (error) throw error;
    });
  return result[0];
}

module.exports = query;
