const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect("db string ");
};

module.exports = connectDb;
