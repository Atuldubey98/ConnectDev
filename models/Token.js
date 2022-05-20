const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TokenSchema = new Schema({
  refreshToken: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  expired_at: {
    type: Date,
  },
});

module.exports = Token = mongoose.model("tokens", TokenSchema);
