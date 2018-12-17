/**
 *
 * @param {Object} res
 * @param {String} encoded
 */
function setAuthCookie(res, encoded) {
  const options = {};
  res.cookie("user", encoded, options);
}
module.exports = setAuthCookie;
