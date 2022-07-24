const Profile = require("../../models/Profile");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const mongoose = require('mongoose');
const { MONGO_URI } = require("../../config/keys");
const connect = mongoose.createConnection(MONGO_URI,  { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify : false});
let gfs;
connect.once('open', ()=>{
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "avatar"
  });
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
exports.getAvatarImage=catchAsyncErrors(async(req, res, next)=>{
  const file = gfs
    .find({
      filename : req.params.filename
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404)
          .json({
            err: "no files exist"
          });
      }
      gfs.openDownloadStreamByName(req.params.filename)
        .pipe(res);
    });
})

exports.uploadAvatar = catchAsyncErrors(async(req,res,next)=>{
  const file = req.file;
  if (!file) {
    return res.status(400).json({
      status : false
    })
  }
  const _id = req.user._id;
  const newUser = await User.findOneAndUpdate({_id}, {avatar : `${req.originalUrl}/${file.filename}`},  {new : true});
  return res.status(201).json({status : true, message : `Avatar uploaded`, avatar : newUser.avatar});
})

