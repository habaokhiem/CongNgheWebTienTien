function isValidPhone(phoneNumber) {
  var found = phoneNumber.search(
    /^(05|03|04|07|08|09|024|028)[0-9]{8}$|(\84)[0-9]{9}$|(021[012345689]|023[23456789]|020[3456789]|022[0123456789]|029[01234679]|025[123456789]|026[01239]|027[01234567])[0-9]{7}$/
  );
  if (found > -1) {
    return true;
  } else {
    return false;
  }
}

module.exports = isValidPhone;
