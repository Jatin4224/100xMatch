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

app.use((req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
