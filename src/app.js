const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUp } = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

//creating apis

//using json middleware so we can read body data
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  // console.log(req.body);
  // logic to add data into a database
  try {
    validateSignUp(req);

    //bcrypting pssword
    const { firstName, lastName, password, emailId } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    //creating a new instance-The new keyword is only used when creating a new document instance
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });

    await user.save();
    res.send("User added succesfully");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

app.post("/login", async (req, res) => {
  //reading data
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("user is not signup up");
    }
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (isPasswordValid) {
    //create jwt token

    //add the token to the cookie and send the response back

    //create token
    const token = await jwt.sign({ _id: user._id }, "872069");
    console.log(token);

    //sending token back to the user
    res.cookie("token", token);

    res.send("login succes");
    // } else {
    //   throw new Error("invalid credentials ");}
  } catch (err) {
    res.status(400).send("error login user " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  //validating cookie
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    //handling error cases
    if (!token) {
      throw new Error("Invalid creadentials");
    }
    //validating token
    const decodedMessage = await jwt.verify(token, "872069");
    // console.log(decodedMessage);

    const { _id } = decodedMessage;
    console.log("Logged in user is:" + _id);
    //getting user info
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not valid");
    }
    res.send(user);
    //console.log(cookies);
    res.send("cookies ready ");
  } catch (err) {
    res.status(400).send("error" + err.message);
  }
});
// feed API - Get all the users from database
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length == 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  const userEmails = req.body.emailId;

  const user = await User.findOne({ emailId: userEmails });

  if (!user) {
    res.send(404).send("user not found");
  } else {
    res.send(user);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  const user = await User.findByIdAndDelete({ _id: userId });
  res.send("user selected deleted");
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  const user = await User.findByIdAndUpdate({ _id: userId }, data, {
    returnDocument: "after",
  });
  console.log(user);
  res.send("user updated success");
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
