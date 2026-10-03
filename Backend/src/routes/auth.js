const express = require("express");
const authRouter = express.Router();
const { validatedData, validateSigninData } = require("../utils/validate");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const TOKEN_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
};

const setAuthCookie = (res, user) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  res.cookie("token", token, { ...cookieOptions, maxAge: TOKEN_MAX_AGE_MS });
};

authRouter.post("/signup", async (req, res) => {
  let data;
  try {
    data = validatedData(req);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const { email, password, firstName, lastName } = data;

    //hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    setAuthCookie(res, savedUser);
    res.status(201).json({ message: "signup successful", data: savedUser });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email is already registered" });
    }
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

authRouter.post("/signin", async (req, res) => {
  try {
    let credentials;
    try {
      credentials = validateSigninData(req);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
    const { email, password } = credentials;

    const user = await User.findOne({ email }).select("+password");
    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));

    // same response for unknown email and wrong password
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    setAuthCookie(res, user);
    return res.json({ message: "signin successful", data: user });
  } catch (err) {
    console.error("Signin Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

authRouter.post("/signout", async (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.json({ message: "signout success" });
});

module.exports = authRouter;
