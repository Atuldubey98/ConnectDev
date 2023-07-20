const catchAsyncErrors = require("../api/middlewares/catchAsyncErrors");
const User = require("../models/User");
const { decryptTokenAndGetUser } =
  require("../api/repository/encryptionRepository")();
const ErrorHandler = require("./errorhandler");
exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to get resource", 401));
  }
  const decodeData = await decryptTokenAndGetUser(token);
  const user = await User.findOne(
    { email: decodeData.email },
    "name email avatar _id"
  );
  req.user = user;
  next();
});
