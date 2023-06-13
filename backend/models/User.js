const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE } = require("../config/keys");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    index: true,
    lowercase: true,
    unique: true,
    validate: [validateEmail, "Please fill a valid email address"],
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
UserSchema.index({ email: "text", name: "text" });
UserSchema.methods.getJWTToken = (email, name, id) => {
  return jwt.sign(
    {
      email,
      name,
      id,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRE,
    }
  );
};
UserSchema.plugin(mongoosePaginate);

module.exports = User = mongoose.model("users", UserSchema);
