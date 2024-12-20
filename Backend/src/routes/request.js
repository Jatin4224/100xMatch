// request/send/intrested/:userid
// request/send/ignored/:userid
// request/review/accepted/:userId
// request/request/rejected/:requestId
const express = require("express");
const requestRouter = express.Router();
const Request = require("../models/request");
const userAuth = require("../middleware/auth");

requestRouter.post(
  "/request/send/:status/:toUserid",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserid;
      const status = req.params.status;

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

module.exports = requestRouter;
