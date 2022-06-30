const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  likes: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  header: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  title: {
    type: String,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
