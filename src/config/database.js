const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect("db string ");
};

module.exports = connectDb;

// current string of cluter 4224 created by jatinvitbhopal account
const URI =
  "mongodb+srv://jatin4224:MyrigWDrXvTCGMeB@cluster4224.cctoa.mongodb.net/";
