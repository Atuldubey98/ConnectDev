const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    index : true
  },
  email: {
    type: String,
    index: true,
    lowercase: true,
    required: [true, "can't be blank"],
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
UserSchema.methods.getJWTToken = (email, name, id) => {
  return jwt.sign(
    {
      email,
      name,
      id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

module.exports = User = mongoose.model("users", UserSchema);
