const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");
//creating apis

app.post("/user", async (req, res) => {
  //logic to add data into a database

  const user = new User({
    firstName: "jai",
    lastName: "sharma",
    emailId: "@jatin.com",
    password: "123",
  });
  try {
    await user.save();
    res.send("User added succesfully");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

connectDb()
  .then(() => {
    console.log("db connection success");
  })
  .catch((err) => {
    console.log("db is not connected");
  });

app.listen(3000, () => {
  console.log("server is working fine");
});
