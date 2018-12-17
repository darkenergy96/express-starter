const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const router = express.Router();
const encodeAuthPayload = require("../../utils/auth/encodeAuthPayload");
const setAuthCookie = require("../../utils/auth/setAuthCookie");
const saltRounds = 10;
router.post("/signup", async function(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const pwdHash = await bcrypt.hash(password, saltRounds);
      const newUser = new User({ email, password: pwdHash });
      await newUser.save();
      const payload = { email };
      const encoded = encodeAuthPayload(payload);
      setAuthCookie(res, encoded);
      return res.json({
        success: true,
        message: "Signed up successfully"
      });
    }
    //statuscode - 409 for conflict
    return res.status(409).json({
      success: true,
      message: "This email is already taken!"
    });
  } catch (err) {
    next(err);
  }
});
router.post("/signin", async function(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isCorrectPwd = await bcrypt.compare(password, user.password);
      if (isCorrectPwd) {
        const payload = { email };
        const encoded = encodeAuthPayload(payload);
        setAuthCookie(res, encoded);
        return res.json({
          success: true,
          message: "Signed in successfully"
        });
      }
      return res.json({
        success: false,
        message: "Incorrect details"
      });
    }
    return res.json({
      success: false,
      message: "Incorrect details"
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
