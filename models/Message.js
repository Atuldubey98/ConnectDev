const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "room",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
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
});

module.exports = Message = mongoose.model("message", MessageSchema);
