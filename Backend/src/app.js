const express = require("express");
const app = express();
require("dotenv").config();
const connectDb = require("./config/db");
const bcrypt = require("bcrypt");
const port = process.env.PORT || 4000;
app.use(express.json());
const User = require("./models/user");
const validator = require("validator");
const validatedData = require("./utils/validate");
connectDb();

app.post("/signup", async (req, res) => {
  try {
    validatedData(req);
    const { email, password } = req.body;

    //hashing
    const hashedPassowrd = await bcrypt.hash(password, 10);
    const user = new User({
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
app.listen(port, () => {
  console.log("server running fine");
});
