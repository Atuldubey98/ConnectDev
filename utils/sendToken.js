const sendToken = async (user, statusCode, res) => {
  const token = await user.getJWTToken(user.email, user.name);
  // options for cookie
  const options = {
    httpOnly :  true,
    sameSite: true
  };
  const { email, name } = user;
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user: {
      email,
      name,
    },
    token,
  });
};
module.exports = sendToken;
