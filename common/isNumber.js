function isNumber(value) {
  return /^-?\d+$/.test(value);
}

module.exports = isNumber;
