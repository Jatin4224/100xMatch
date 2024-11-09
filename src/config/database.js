const mongoose = require("mongoose");

//a good thing is to use async and await
const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://jatin4224:MyrigWDrXvTCGMeB@cluster4224.cctoa.mongodb.net/helloworld"
  );
};

module.exports = connectDb;

// current string of cluter 4224 created by jatinvitbhopal account
// const URI =
//   "mongodb+srv://jatin4224:MyrigWDrXvTCGMeB@cluster4224.cctoa.mongodb.net/";
