const Profile = require("../../models/Profile");

const postUserProfile = (req, res, next) => {
  Profile.findOne({ user: req.user.id }).then((profile) => {
    if (!profile) {
      const profileNew = new Profile({
        skills: req.body.skills,
        user: req.user.id,
        handle: req.body.handle,
        status: req.body.status,
        experience: req.body.experience,
        education: req.body.education,
      });
      profileNew
        .save()
        .then(() => {
          return res.status(201).json({
            status: "Profile Created",
          });
        })
        .catch(() => {
          return res.status(404).json({
            status: "Oops ! Some error occured",
          });
        });
    } else {
      Profile.updateOne(
        { user: req.user.id },
        {
          skills: req.body.skills,
          handle: req.body.handle,
          status: req.body.status,
          experience: req.body.experience,
          education: req.body.education,
        }
      )
        .then(() => {
          return res.status(200).json({ status: "User Profile Updated" });
        })
        .catch((err) => {
          return res.status(404).json({ status: "Some Error Occured" });
        });
    }
  });
};

const getUserProfile = (req, res, next) => {
  const id = req.user.id;
  Profile.findOne({ user: id }).then((profile) => {
    console.log(profile);
    return profile
      ? res.status(200).json(profile)
      : res.status(404).json({ status: "Profile Doesn't Exist" });
  });
};

const getUserProfileById = (req, res, next) => {
  Profile.findOne({ user: req.params.id }).then((profile) => {
    return profile
      ? res.status(200).json(profile)
      : res.status(404).json({ status: "Profile Doesn't Exist" });
  });
};
module.exports = {
  postUserProfile,
  getUserProfile,
  getUserProfileById,
};
