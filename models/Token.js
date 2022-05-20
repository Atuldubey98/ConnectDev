const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TokenSchema = new Schema({
  refreshToken: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    unique :  true
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Token = mongoose.model("tokens", TokenSchema);
