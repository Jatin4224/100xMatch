const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validate");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  res.json({ data: req.user });
});

//profile/edit
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  let updates;
  try {
    updates = validateEditProfileData(req);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  try {
    const loggedInUser = req.user;

    Object.keys(updates).forEach((key) => (loggedInUser[key] = updates[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile was updated`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = profileRouter;
