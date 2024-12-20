const mongoose = require("mongoose");
const { equals } = require("validator");
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
requestSchema.pre("save", function (next) {
  const request = this;

  if (request.fromUserId.equals(request.toUserId)) {
    throw new Error("fromUserId and toUserId cannot be the same.");
  }

  next();
});
module.exports = mongoose.model("Request", requestSchema);
