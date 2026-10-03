require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

const app = express();
const port = process.env.PORT || 4000;
const clientOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());
app.use(cors({ origin: clientOrigins, credentials: true }));

app.use("/api/v1", authRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", requestRouter);
app.use("/api/v1", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON body" });
  }
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

const start = async () => {
  for (const name of ["MONGO_URL", "JWT_SECRET"]) {
    if (!process.env[name]) {
      console.error(`Missing required environment variable: ${name}`);
      process.exit(1);
    }
  }
  await connectDb();
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};

if (require.main === module) {
  start().catch((err) => {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  });
}

module.exports = app;
