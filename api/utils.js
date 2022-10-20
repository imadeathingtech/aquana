const escapeSpecialChars = function (str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/\$/g, "\\$")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"');
};

module.exports = escapeSpecialChars;
