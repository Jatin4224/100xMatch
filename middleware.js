const express = require("express");

const app = express();

//Q) handle auth middleware for all request?
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
  //now i need to put this logic for all the endpoints -> using middlewares
  //   const token = "xyz";
  //   const isAdminAuthorized = token === "xyz";
  //   if (isAdminAuthorized) {
  res.send("all data sent");
  //   } else {
  //     res.statuss(401).send("unauthorized request");
  //   }
});

app.get("/admin/deleteUser", (req, res) => {
  //logic of cheking if the req is authorized

  res.send("deleted a user");
});

app.listen("8888", () => {
  console.log("server running on port ");
});

//this middleware only be called for /admin
