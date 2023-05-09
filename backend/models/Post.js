const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  likes: {
    type: Array,
    ref: "likes",
  },
  comments: {
    type: Array,
    ref: "comments",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  tags: {
    type: Array,
    default: [],
  },
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
