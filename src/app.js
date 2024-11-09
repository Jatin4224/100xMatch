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
// const express = require("express");

// const app = express();

// app.get("/user", (req, res, next) => {
//   console.log("handling request");
//   next();
// });

// app.get("/user", (req, res, next) => {
//   console.log("handling request 2");
//   res.send("2nd route handler");
// });

// app.listen(3000, () => {
//   console.log("server running on port 3000 ");
// });

// middleware
const express = require("express");

const app = express();
app.use("/admin", (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";

  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
});
//for authorization its very typical to write auth logic for every endpoint
app.get("/admin/getAllData", (req, res) => {
  //logic of cheking if the req is authorized
  res.send("all data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  //logic of cheking if the req is authorized

  res.send("deleted a user");
});

app.listen("8888", () => {
  console.log("server running on port ");
});
