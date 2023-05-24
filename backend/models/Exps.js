const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExpSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  dates: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  user: {
    type: String,
    ref: "users",
  },
});
module.exports = Exps = mongoose.model("experience", ExpSchema);
