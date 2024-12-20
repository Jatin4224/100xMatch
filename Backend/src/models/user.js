const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: String,
  about: String,
  photourl: String,
  about: String,
  gender: String,
  age: Number,
});

module.exports = mongoose.model("User", userSchema);
