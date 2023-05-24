const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
module.exports = Comments = mongoose.model("comments", CommentsSchema);
