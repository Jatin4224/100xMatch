const express = require("express");
const authRouter = express.Router();
const { validatedData } = require("../utils/validate");
const jwtsecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    validatedData(req);
    const { email, password, firstName, lastName } = req.body;

    //hashing
    const hashedPassowrd = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassowrd,
    });

    await user.save();
    res.send("success");
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

authRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, jwtsecret, { expiresIn: "24h" });

    res.cookie("token", token, { httpOnly: true, secure: false });
    return res.send(user);
  } catch (err) {
    console.error("Signin Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

authRouter.post("/signout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("signout success");
});

module.exports = authRouter;
