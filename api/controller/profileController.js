const mongoose = require("mongoose");
const { MONGO_URI } = require("../../config/keys");
const Profile = require("../../models/Profile");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const connection = mongoose.createConnection(MONGO_URI);
const Skill = require("../../models/Skills");
const Exps = require("../../models/Exps");
const Education = require("../../models/Education");
const Handle = require("../../models/Handle");
const User = require("../../models/User");
const path = require("path");

let gfs;
connection.once("open", async () => {
  gfs = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: "avatar",
  });
});
exports.getProfile = catchAsyncErrors(async (req, res, next) => {
  const { _id } = req.user;
  const existProfile = await Profile.findOne({ user: _id });
  if (!existProfile) {
    return res
      .status(400)
      .json({ status: false, message: "Please create a profile" });
  }
  const profile = await Profile.findOne({ user: _id })
    .populate("skills")
    .populate("experience")
    .populate("education")
    .populate("handle");
  return res.status(200).json(profile);
});

exports.postProfile = catchAsyncErrors(async (req, res, next) => {
  const user = req.user._id;
  const profile = await Profile.findOne({ user });
  if (profile) {
    await Skill.deleteMany({ user });
    await Profile.deleteOne({ user });
    await Exps.deleteMany({ user });
    await Education.deleteMany({ user });
    await Handle.deleteMany({ user });
  }
  let { skills, experience, education, handle } = req.body;
  const insertedHandles = await Handle.insertMany(
    handle.map((handle) => {
      const { _id, ...other } = handle;
      return {
        ...other,
        user,
      };
    })
  );
  const insertedSkills = await Skill.insertMany(
    skills.map((skill) => {
      const { _id, ...other } = skill;
      return {
        ...other,
        user,
      };
    })
  );
  const insertedExps = await Exps.insertMany(
    experience.map((exp) => {
      const { _id, ...other } = exp;
      return {
        ...other,
        user,
      };
    })
  );
  const insertedEducation = await Education.insertMany(
    education.map((edu) => {
      const { _id, ...other } = edu;
      return {
        ...other,
        user,
      };
    })
  );
  const newProfile = new Profile({
    ...req.body,
    skills: insertedSkills.map((skill) => skill._id),
    experience: insertedExps.map((exp) => exp._id),
    education: insertedEducation.map((edu) => edu._id),
    handle: insertedHandles.map((handle) => handle._id),
    user,
  });
  await newProfile.save();
  const savedProfile = await Profile.findOne({ user })
    .populate("skills")
    .populate("experience")
    .populate("education")
    .populate("handle");
  return res.status(201).json(savedProfile);
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { _id } = req.user;
  const filter = { user: _id };

  const profile = await Profile.findOne(filter);
  if (!profile) {
    return res.status(400).json({ status: false });
  }
  const updatedProfile = await Profile.findOneAndUpdate(
    filter,
    { ...req.body },
    { new: true }
  );
  return res.status(201).json({
    status: true,
    message: "Profile patched",
    profile: updatedProfile,
  });
});
exports.getAvatarImage = catchAsyncErrors(async (req, res, next) => {
  gfs
    .find({
      filename: req.params.filename,
    })
    .toArray((err, files) => {
      console.log(files);
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
    });
  gfs.openDownloadStreamByName(req.params.filename).pipe(res);
});

exports.uploadAvatar = catchAsyncErrors(async (req, res, next) => {
  const file = req.file;
  if (!('name' in req.body) && !file) {
    return res.status(400).json({
      status: false,
      message: "Please attach avatar as well as name",
    });
  }
  const _id = req.user._id;
  const { name } = req.body;
  if (!file) {
    const user = await User.findOneAndUpdate(
      { _id },
      { name },
      { new: true }
    ).select("name");
    return res
      .status(201)
      .json({ status: true, message: `Avatar uploaded`, user });
  }
  const existingUser = await User.findById(_id);
  if (existingUser.avatar && existingUser.avatar !== "") {
    const prevFileName = path.basename(existingUser.avatar);
    gfs.find({ filename: prevFileName }).toArray((err, files) => {
      if (files.length > 0) {
        const id = files[0]._id;
        gfs.delete(id);
      }
    });
  }

  const user = await User.findOneAndUpdate(
    { _id },
    { avatar: `${req.originalUrl}/${file.filename}`, name },
    { new: true }
  ).select("name avatar");
  return res
    .status(201)
    .json({ status: true, message: `Avatar uploaded`, user });
});
// Get user
exports.getRandomUserProfile = catchAsyncErrors(async (req, res, next) => {
  const { _id } = req.params;
  const profile = await Profile.findOne({ user: _id })
    .populate("user")
    .select("name avatar email")
    .populate("skills")
    .populate("experience")
    .populate("education")
    .populate("handle");
  if (!profile) {
    return res.status(404).json({
      status: false,
      message: "Please ask the user to create the profile",
    });
  }

  return res.status(200).json(profile);
});
