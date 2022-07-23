const User = require("../../models/User");
const Profile = require("../../models/Profile");
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

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  return res.status(200).json({ status: true, message: "User logged out" });
});

exports.getCurrentUserProfile = catchAsyncErrors(async (req, res,next)=>{
  const user = req.user;
  const profile = await Profile.findOne({user:user._id});
  if (!profile) {
    return res.status(200).json(user);
  }
  return res.status(200).json(user);
})

