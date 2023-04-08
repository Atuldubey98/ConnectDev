const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  skills: {
    type: Array,
    required: true,
    ref: "skill",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    index: true,
  },
  handle: {
    type: Array,
    ref: "handle",
  },
  status: {
    type: String,
    default: "Here is using your website",
  },
  experience: {
    type: Array,
    ref: "experience",
  },
  education: {
    type: Array,
    ref: "education",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = Profile = mongoose.model("profiles", ProfileSchema);
