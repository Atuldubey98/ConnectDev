const sendToken = async (user, statusCode, res) => {
  const token = await user.getJWTToken(user.email, user.name);
  // options for cookie
  const options = {
    httpOnly: true,
    sameSite: true,
  };
  res.status(statusCode).cookie("token", token, options).json(user);
};
module.exports = sendToken;
