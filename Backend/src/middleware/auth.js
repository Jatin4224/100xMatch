const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "Not logged In",
      });
    }
    s;
    const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedMessage;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      message: "error" + error.message,
    });
  }
};

module.exports = userAuth;
