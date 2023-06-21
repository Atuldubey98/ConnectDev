const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const {
  createNewProfile,
  uploadProfilePhoto,
  updateUploadedProfilePicture,
  getFullProfileOrError,
} = require("../repository/profileRepository")();
exports.getProfile = catchAsyncErrors(async (req, res, next) => {
  const profile = await getFullProfileOrError(req.user._id);
  return res.status(200).json(profile);
});
exports.updateUploadedProfilePicture = catchAsyncErrors(
  async (req, res, next) => {
    await updateUploadedProfilePicture(req.file, req.user._id);
    return res.status(201).send(req.file.path);
  }
);
exports.postProfile = catchAsyncErrors(async (req, res, next) => {
  await createNewProfile(req.user._id, req.body);
  const savedProfile = await getFullProfileOrError(req.user._id);
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
  const profile = await getFullProfileOrError(_id);
  return res.status(200).json(profile);
});

exports.uploadProfilePhotoController = catchAsyncErrors(
  async (req, res, next) => {
    const userId = req.user._id;
    await uploadProfilePhoto(req.file, userId);
    return res.status(201).send(req.file.path);
  }
);
