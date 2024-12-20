const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    fromUserId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "rejected", "accepted", "ignored"],
        message: `{values} incorrect`,
      },
      required: [true, "status is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Request", requestSchema);
