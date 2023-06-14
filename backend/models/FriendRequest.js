const { Schema, model } = require("mongoose");
const FriendRequestSchema = new Schema(
  {
    requestor: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      enum: ["requested", "accepted", "rejected"],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = FriendRequest = model("friend-request", FriendRequestSchema);
