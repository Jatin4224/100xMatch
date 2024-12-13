const express = require("express");
const app = express();
require("dotenv").config();
const connectDb = require("./config/db");
const port = process.env.PORT || 4000;

connectDb();

app.listen(port, () => {
  console.log("server running fine");
});
