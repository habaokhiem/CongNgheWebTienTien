function isValidUsername(username) {
  /* 
      Usernames can only have: 
      - Lowercase Letters (a-z) 
      - Numbers (0-9)
      - Dots (.)
      - Underscores (_)
    */
  const res = /^[a-z0-9_\.]+$/.exec(username);
  const validLength = username.length >= 6 && username.length <= 10;
  const valid = !!res && validLength;
  return valid;
}

module.exports = isValidUsername;
