const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikesSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = Likes = mongoose.model("likes", LikesSchema);
