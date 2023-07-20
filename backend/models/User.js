const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const { getTokenAndEncryptionThePayload } =
  require("../api/repository/encryptionRepository")();
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
  lastActive: {
    type: Date,
    default: Date.now,
  },
  isActiveNow: {
    type: Boolean,
    default: false,
  },
});
UserSchema.index({ email: "text", name: "text" });
UserSchema.methods.getJWTToken = async (email, name, id) => {
  const jwt = await getTokenAndEncryptionThePayload({
    email,
    name,
    id,
  });
  return jwt;
};
UserSchema.plugin(mongoosePaginate);

module.exports = User = mongoose.model("users", UserSchema);
