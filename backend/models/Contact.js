const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "room",
  },
  chatId: {
    type: String,
  },
}, { timestamps: true });

module.exports = Contact = mongoose.model("contact", ContactSchema);
