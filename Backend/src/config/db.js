const mongoose = require("mongoose");
require("dotenv").config();
const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Db connected"))
    .catch((err) => console.log(err.message));
};

module.exports = connectDb;
