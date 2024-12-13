const express = require("express");
const app = express();
require("dotenv").config();
const connectDb = require("./config/db");
const bcrypt = require("bcrypt");
const port = process.env.PORT || 4000;
app.use(express.json());
const User = require("./models/user");
connectDb();

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  //hashing
  const hashedPassowrd = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassowrd,
  });

  await user.save();
  res.send("success");
});
app.listen(port, () => {
  console.log("server running fine");
});
