const connectDb = require("./config/database");

connectDb()
  .then(() => {
    console.log("db success");
  })
  .catch((err) => {
    console.log("db not connected");
  });

app.listen("/3000", (req, res) => {
  console.log("server running on port 3000");
});
