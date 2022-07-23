const Profile = require("../../models/Profile");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const {
  postProfile,
  getProfile,
  updateProfile,
 
} = require("../controller/userController");
const {getAvatar}= require("../../config/mongoconnection");

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

exports.uploadAvatar=catchAsyncErrors(async(req,res,next)=>{
  const file = req.file;
  
  return res.status(201).json({status : true, profile : "Profile avatar uploaded"});
})

