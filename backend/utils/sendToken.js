const { NODE_ENV } = require("../config/keys");

const sendToken = async (user, statusCode, res) => {
  const token = await user.getJWTToken(user.email, user.name, user._id);
  // options for cookie
  const options = {
    httpOnly: true,
    sameSite: true,
    path: "/",
    expires: new Date(Date.now() + 900000),
    secure: NODE_ENV !== "development",
  };
  res.status(statusCode).cookie("token", token, options).json(user);
};
module.exports = sendToken;
