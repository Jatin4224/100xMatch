// request/send/intrested/:userid
// request/send/ignored/:userid
// request/review/accepted/:userId
// request/request/rejected/:requestId
const express = require("express");
const requestRouter = express.Router();
const Request = require("../models/request");
const userAuth = require("../middleware/auth");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserid",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserid;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "invalid status" + status,
        });
      }

      const existingConnectionRequest = await Request.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "request already pending",
        });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({
          message: "request already pending",
        });
      }
      const connectionRequest = new Request({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.status(201).json(data);
    } catch (err) {
      console.error(err);
      res.status(400).json({
        error: "Failed to send connection request",
        details: err.message,
      });
    }
  }
);

requestRouter.post("/request/review/:status/requestId", async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;
    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "status not allowed" });
    }

    const connectionRequest = await Request.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "intrested",
    });

    if (!connectionRequest) {
      return res.status(400).json({ message: "request not found" });
    }
    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.send("connection request accepted", data);
  } catch (err) {
    res.send(err.message);
  }
});
module.exports = requestRouter;
