const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middleware/auth");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).json({
      message: "error" + error.message,
    });
  }
});

//profile/edit
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {});
//update-profile/password
module.exports = profileRouter;
