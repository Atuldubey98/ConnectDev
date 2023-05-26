const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HandleSchema = new Schema({
  username: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  user: {
    ref: "users",
    type: Schema.Types.ObjectId,
    required: true,

  },
}, { timestamps: true });

module.exports = Handle = mongoose.model("handle", HandleSchema);
