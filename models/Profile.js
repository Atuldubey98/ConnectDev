const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  skills: {
    type: Array,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
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
    default : Date.now()
  },
});
module.exports = Profile = mongoose.model("profiles", ProfileSchema);
