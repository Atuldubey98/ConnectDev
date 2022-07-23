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

exports.getProfile=catchAsyncErrors(async(req,res,next)=>{
  const {_id}=req.user;
  const profile = await Profile.findOne({user : _id});
  if (!profile) {
    return res.status(400).json({status : false});
  }
  return res.status(200).json(profile);
})

exports.postProfile=catchAsyncErrors(async(req, res,next)=>{
  const user = req.user._id;
  const newProfile = new Profile({...req.body, user});
  await newProfile.save();
  return res.status(201).json({status : true, profile : newProfile, message : "User Profile created"})
})

exports.updateProfile=catchAsyncErrors(async(req, res, next)=>{
  const {_id}=req.user;
  const filter={user : _id};

  const profile=await Profile.findOne(filter);
  if (!profile) {
    return res.status(400).json({status : false});
  }
  const updatedProfile = await Profile.findOneAndUpdate(filter,{...req.body}, {new : true});
  return res.status(201).json({status : true, message : "Profile patched" , profile : updatedProfile});
})