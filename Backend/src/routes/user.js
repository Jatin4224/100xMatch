const express = require("express");
const Request = require("../models/request");
const userRouter = express.Router();
const userAuth = require("../middleware/auth");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await Request.findOne({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName LastName age gender about");

    res.send(connectionRequest);
  } catch (err) {
    res.send(err.message);
  }
});
//get/user/requests
//user/feed
module.exports = userRouter;
