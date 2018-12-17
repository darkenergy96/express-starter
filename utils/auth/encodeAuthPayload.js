const jwt = require("jsonwebtoken");
const jwtSecret = process.env.jwtSecret || "super secret";
function encodeAuthPayload(payload) {
  return jwt.sign(payload, jwtSecret);
}
module.exports = encodeAuthPayload;
