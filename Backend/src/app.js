const express = require("express");
const app = express();
require("dotenv").config();
const connectDb = require("./config/db");
const cors = require("cors");
const port = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const authRouter = require("../src/routes/auth");
const profileRouter = require("../src/routes/profile");
const requestRouter = require("../src/routes/request");
const userRouter = require("./routes/user");
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
connectDb();

app.use("/api/v1", authRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", requestRouter);
app.use("/api/v1", userRouter);
app.listen(port, () => {
  console.log("server running fine");
});
