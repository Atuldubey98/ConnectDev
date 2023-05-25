const { NODE_ENV } = require("../config/keys");

const sendToken = async (user, statusCode, res) => {
  const token = await user.getJWTToken(user.email, user.name, user._id);
  // options for cookie
  const options = {
    httpOnly: true,
    sameSite: true,
    path: "/",
    secure: NODE_ENV !== "development",
  };
  res.status(statusCode).cookie("token", token, options).json(user);
};
module.exports = sendToken;
