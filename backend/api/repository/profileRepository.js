const Education = require("../../models/Education");
const Exps = require("../../models/Exps");
const Handle = require("../../models/Handle");
const Profile = require("../../models/Profile");
const Skills = require("../../models/Skills");
const ErrorHandler = require("../../utils/errorhandler");
const { getProfileInformationOnlyArray } = require("../../utils/sanitize");
const cloudinary = require("../../config/cloudinary");
const CloudinaryPhotosMeta = require("../../models/CloudinaryPhotosMeta");
const User = require("../../models/User");
function profileRepository() {
  async function getFullProfileOrError(userId) {
    if (!userId) {
      return null;
    }
    const profile = await Profile.findOne({ user: userId })
      .populate("skills")
      .populate("experience")
      .populate("education")
      .populate("handle")
      .populate("user", "name avatar email activeNow _id");
    if (!profile) {
      throw new ErrorHandler("PROFILE_NOT_FOUND", 400);
    }
    return profile;
  }
  async function uploadProfilePhoto(file, userId) {
    const cloudinaryMeta = new CloudinaryPhotosMeta({
      contextId: userId,
      publicId: file.filename,
    });
    await cloudinaryMeta.save();
    await User.updateOne({ _id: userId }, { avatar: file.path });
    return file.path;
  }

  async function updateUploadedProfilePicture(file, userId) {
    const cloudinaryMeta = await CloudinaryPhotosMeta.findOne({
      contextId: userId,
    });
    if (!cloudinaryMeta) {
      throw new ErrorHandler("NO_PROFILE_AVATAR", 400);
    }
    await cloudinary.uploader.destroy(cloudinaryMeta.publicId);
    await CloudinaryPhotosMeta.deleteOne({ contextId: userId });
    await uploadProfilePhoto(file, userId);
  }
  async function updateProfileInformation(profileInfoToUpdate, userId) {
    const filter = {
      user: userId,
    };
    const profile = await getProfileByUserId(filter);
    if (!profile) {
      throw new ErrorHandler("PROFILE_NOT_FOUND", 404);
    }
    const updatedProfile = await Profile.findOneAndUpdate(
      filter,
      profileInfoToUpdate,
      { new: true }
    );
    return updatedProfile;
  }

  async function getProfileByUserId(filter) {
    const profile = await Profile.findOne(filter);
    return profile;
  }
  async function clearProfileInformationIfProfileAlreadyExists(userId) {
    const filter = { user: userId };
    const profile = await getProfileByUserId(filter);
    if (profile) {
      await Skills.deleteMany(filter);
      await Profile.deleteOne(filter);
      await Exps.deleteMany(filter);
      await Education.deleteMany(filter);
      await Handle.deleteMany(filter);
    }
  }
  function addUserFieldRemoveIdFromArray(userId) {
    return (field) => {
      const { _id, ...rest } = field;
      return {
        ...rest,
        user: userId,
      };
    };
  }
  async function createNewProfile(userId, body) {
    await clearProfileInformationIfProfileAlreadyExists(userId);
    const { education, experience, handle, skills } =
      getProfileInformationOnlyArray(body);
    const newSkills = await Skills.insertMany(
      skills.map(addUserFieldRemoveIdFromArray(userId))
    );
    const newEducations = await Education.insertMany(
      education.map(addUserFieldRemoveIdFromArray(userId))
    );
    const newExperiences = await Exps.insertMany(
      experience.map(addUserFieldRemoveIdFromArray(userId))
    );
    const newHandles = await Handle.insertMany(
      handle.map(addUserFieldRemoveIdFromArray(userId))
    );
    const newProfile = new Profile({
      ...body,
      skills: newSkills.map((skill) => skill._id),
      experience: newExperiences.map((exp) => exp._id),
      education: newEducations.map((edu) => edu._id),
      handle: newHandles.map((handle) => handle._id),
      user: userId,
    });
    await newProfile.save();
    return newProfile;
  }

  return Object.freeze({
    updateProfileInformation,
    createNewProfile,
    updateUploadedProfilePicture,
    uploadProfilePhoto,
    getFullProfileOrError,
  });
}

module.exports = profileRepository;
