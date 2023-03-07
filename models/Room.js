const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  users: { type: Array, ref: "users", required: true },
  messages: { type: Array, ref: "message" },
});

module.exports = Room = mongoose.model("room", RoomSchema);
