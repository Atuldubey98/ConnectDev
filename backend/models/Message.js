const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "room",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    msgBody: {
      type: String,
      required: true,
    },
    fileId: {
      type: Schema.Types.ObjectId,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = Message = mongoose.model("message", MessageSchema);
