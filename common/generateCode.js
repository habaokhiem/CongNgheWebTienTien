const crypto = require("crypto");

function generateCode(phoneNumber) {
  // Removing non-numeric characters
  phoneNumber = phoneNumber.replace(/\D/g, "");
  // Creating a hash of the phone number
  const hash = crypto.createHash("sha256").update(phoneNumber).digest("hex");
  // Extracting the first 6 characters
  const code = hash.substring(0, 6);
  console.log("code: ", code);
  // Mixing numbers and letters
  var result = "";
  for (var i = 0; i < code.length; i++) {
    var c = code.charAt(i);
    if (Math.random() > 0.5) c = c.toUpperCase();
    else c = c.toLowerCase();
    result += c;
  }
  console.log("result: ", result);
  return result;
}

module.exports = generateCode;
