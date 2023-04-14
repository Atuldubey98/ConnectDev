const catchAsyncErrors = require("../api/middlewares/catchAsyncErrors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("./errorhandler");
const { JWT_SECRET } = require("../config/keys");
exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to get resource", 401));
  }
  const decodeData = jwt.verify(token, JWT_SECRET);
  const user = await User.findOne(
    { email: decodeData.email },
    "name email avatar"
  );
  req.user = user;
  next();
});