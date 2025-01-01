const express = require("express");
const Request = require("../models/request");
const userRouter = express.Router();
const userAuth = require("../middleware/auth");

const USER_SAFE_DATA = "firstName LastName age gender about";
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await Request.findOne({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.send(connectionRequest);
  } catch (err) {
    res.send(err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await Request.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => row.fromUserId);

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//user/feed
module.exports = userRouter;
