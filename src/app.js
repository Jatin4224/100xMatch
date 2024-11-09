const express = require("express");
const connectDb = require("./config/database");
const app = express();

connectDb()
  .then(() => {
    console.log("db connection success");
  })
  .catch((err) => {
    console.log("db is not connected");
  });

app.listen(3000, () => {
  console.log("server is working fine");
});
