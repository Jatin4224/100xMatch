const express = require("router");
const Request = require("../models/request");

const userRouter = express.Router();
//get/user/connections

userRouter.get("/user/connections", async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await Request.findOne({
      toUserId: loggedInUser._id,
      status: "interested",
    });

    res.send(connectionRequest);
  } catch (err) {
    res.send(err.message);
  }
});
//get/user/requests
//user/feed
module.exports = userRouter;
