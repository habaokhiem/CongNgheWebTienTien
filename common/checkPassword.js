function checkPasswordMatch(password1, password2) {
  let matching = 0;
  let length = password1.length;

  if (password2.length > length) {
    length = password2.length;
  }

  for (let i = 0; i < password1.length; i++) {
    if (password2.includes(password1[i])) {
      matching++;
    }
  }

  let matchPercent = (matching / length) * 100;

  return matchPercent >= 80;
}

module.exports = checkPasswordMatch;
