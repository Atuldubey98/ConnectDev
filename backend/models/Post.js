const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const PostSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    likes: {
      type: Array,
      ref: "likes",
      default: [],
    },
    comments: {
      type: Array,
      default: [],
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
  },
  { timestamps: true }
);

PostSchema.plugin(mongoosePaginate);
PostSchema.index({ title: "text", text: "text", tags: "text" });
module.exports = Post = mongoose.model("post", PostSchema);
