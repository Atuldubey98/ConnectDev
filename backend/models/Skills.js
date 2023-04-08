const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SkillsSchema = new Schema({
  skill : {
    type : String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  yearsWorked : {
    type : Number,
  },
  profile : {
    type : Schema.Types.ObjectId,
    ref : "profiles"
  }
});

module.exports = Skill = mongoose.model("skill", SkillsSchema);
