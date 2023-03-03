const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EducationSchema = new Schema({
  degree: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  dates: {
    type: String,
  },
  description: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = Education = mongoose.model("education", EducationSchema);
