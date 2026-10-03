const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true, maxLength: 50 },
    lastName: { type: String, required: true, trim: true, maxLength: 50 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    about: { type: String, default: "", maxLength: 500 },
    photoUrl: { type: String, default: "" },
    skills: { type: [String], default: [] },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not a valid gender",
      },
    },
    age: { type: Number, min: 18, max: 120 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
