const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  skills: {
    type: Array,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  handle: {
    type: String,
  },
  status: {
    type: String,
  },
  experience: {
    type: Array,
  },
  education: {
    type: Array,
  },
  date: {
    type: Date,
  },
});
module.exports = Profile = mongoose.model("profiles", ProfileSchema);
