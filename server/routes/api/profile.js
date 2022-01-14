const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");
const {
  postUserProfile,
  getUserProfile,
  getUserProfileById,
} = require("../controller/profile");
require("../../config/passport")(passport);

//@route POST api/profile
// @desc Posting or Updating a profile
// @access private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postUserProfile
);

//@route GET api/profile
// @desc Getting current user profile
// @access private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getUserProfile
);

//@route GET api/profile/:id
// @desc Getting user profile of user
// @access private

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getUserProfileById
);

module.exports = router;
