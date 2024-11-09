// const connectDb = require(".src/config/database");

// connectDb()
//   .then(() => {
//     console.log("db success");
//   })
//   .catch((err) => {
//     console.log("db not connected");
//   });

// // app.listen("/3000", (req, res) => {
// //   console.log("server running on port 3000");
// // });
const express = require("express");

const app = express();

app.post(
  "/user",
  (req, res, next) => {
    console.log("handling request");
    next();
  },
  (req, res, next) => {
    console.log("handling the route user 2");
    next();
  },
  (req, res, next) => {
    console.log("handling route 2");
    next();
  },
  (req, res, next) => {
    res.send("5th response");
  }
);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
