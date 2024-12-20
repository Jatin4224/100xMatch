const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validate");
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
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateEditProfileData(req);

    if (!validateEditProfileData) {
      res.status(404).send("invalid field");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach(
      (keys) => (loggedInUser[keys] = req.body[keys])
    );
    await loggedInUser.save();
    res.send("updated user");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
//update-profile/password
module.exports = profileRouter;
