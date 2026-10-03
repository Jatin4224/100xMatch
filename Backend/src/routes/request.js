// request/send/interested/:toUserId
// request/send/ignored/:toUserId
// request/review/accepted/:requestId
// request/review/rejected/:requestId
const express = require("express");
const mongoose = require("mongoose");
const requestRouter = express.Router();
const Request = require("../models/request");
const userAuth = require("../middleware/auth");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const { status, toUserId } = req.params;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "invalid status: " + status,
        });
      }

      if (!mongoose.isValidObjectId(toUserId)) {
        return res.status(400).json({ message: "invalid user id" });
      }

      if (fromUserId.equals(toUserId)) {
        return res
          .status(400)
          .json({ message: "cannot send a request to yourself" });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "user not found",
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
          message: "request already exists",
        });
      }

      const connectionRequest = new Request({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.status(201).json({
        message:
          status === "interested"
            ? `${req.user.firstName} is interested in ${toUser.firstName}`
            : `${req.user.firstName} ignored ${toUser.firstName}`,
        data,
      });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ message: "request already exists" });
      }
      console.error(err);
      res.status(400).json({
        message: "Failed to send connection request",
      });
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "status is not allowed" });
      }

      if (!mongoose.isValidObjectId(requestId)) {
        return res.status(400).json({ message: "invalid request id" });
      }

      // only the receiver of a pending "interested" request can review it
      const connectionRequest = await Request.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(404).json({ message: "request not found" });
      }
      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({ message: "connection request " + status, data });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Failed to review connection request" });
    }
  }
);
module.exports = requestRouter;
