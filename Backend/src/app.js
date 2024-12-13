const express = require("express");
const app = express();
require("dotenv").config();
const connectDb = require("./config/db");
const port = process.env.PORT || 4000;
app.use(express.json());
connectDb();

app.post("/signup", (req, res) => {});
app.listen(port, () => {
  console.log("server running fine");
});
