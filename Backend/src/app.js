const express = require("express");
const app = express();
require("dotenv").config();
const connectDb = require("./config/db");
const bcrypt = require("bcrypt");
const port = process.env.PORT || 4000;

const User = require("./models/user");
const cookieParser = require("cookie-parser");
const validatedData = require("./utils/validate");
app.use(express.json());
app.use(cookieParser());
connectDb();

app.post("/signup", async (req, res) => {
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

app.get("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new error("user is not found");
    }

    const loggedInUser = await bcrypt.compare(password, user.password);
    if (loggedInUser) {
      res.cookie("token", "hsbdfabfhab");
      res.status(200).json({
        message: `logged in user ${user}`,
      });
    } else {
      res.status(404).send("user not found");
    }
  } catch (err) {
    res.send(err.message);
  }
});

app.get("/profile", async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  res.send("cookie found");
});
app.listen(port, () => {
  console.log("server running fine");
});
