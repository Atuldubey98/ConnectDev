const Profile = require("../../models/Profile");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { createNewProfile, uploadProfilePhoto, updateUploadedProfilePicture } =
  require("../repository/profileRepository")();
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
    .populate("handle")
    .populate("user", "name avatar email date _id");
  return res.status(200).json(profile);
});
exports.updateUploadedProfilePicture = catchAsyncErrors(
  async (req, res, next) => {
    await updateUploadedProfilePicture(req.file,  req.user._id);
    return res.status(201).send(req.file.path);
  }
);
exports.postProfile = catchAsyncErrors(async (req, res, next) => {
  await createNewProfile(req.user._id, req.body);
  const savedProfile = await Profile.findOne({ user: req.user._id })
    .populate("skills")
    .populate("experience")
    .populate("education")
    .populate("handle");
  return res.status(201).json(savedProfile);
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const updatedProfile = await updateProfileInformation(
    ...req.body,
    req.user._id
  );
  return res.status(201).json({
    status: true,
    message: "Profile patched",
    profile: updatedProfile,
  });
});

// Get user
exports.getRandomUserProfile = catchAsyncErrors(async (req, res, next) => {
  const { _id } = req.params;
  const profile = await Profile.findOne({ user: _id })
    .populate("user")
    .select("name avatar email _id")
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

exports.uploadProfilePhotoController = catchAsyncErrors(
  async (req, res, next) => {
    const userId = req.user._id;
    await uploadProfilePhoto(req.file, userId);
    return res.status(201).send(req.file.path);
  }
);
