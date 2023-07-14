const { NODE_ENV } = require("../config/keys");

const sendToken = async (user, statusCode, res) => {
  const token = await user.getJWTToken(user.email, user.name, user._id);
  const options = {
    httpOnly: true,
    sameSite: "strict",
    maxAge : 3600000,
    secure: NODE_ENV !== "development",
  };
  const { email, _id, name } = user;
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ email, _id, name });
};
module.exports = sendToken;
