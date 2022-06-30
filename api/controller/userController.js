const User = require("../../models/User");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const bcryptjs = require("bcryptjs");
const sendToken = require("../../utils/sendToken");
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password, name } = req.body;
  const user = new User({
    email,
    name,
    password: await bcryptjs.hash(password, 12),
  });
  await user.save();
  return res.status(201).json({ status: true, message: "User created" });
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ status: false, message: "User not authenticated" });
  }
  if (!(await bcryptjs.compare(password, user.password))) {
    return res
      .status(400)
      .json({ status: false, message: "User not authenticated" });
  }
  sendToken(user, 201, res);
});
