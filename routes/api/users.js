const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  register,
  login,
  getCurrentUser,
  logout,
  tokenRefresh,
} = require("../controller/users");
require("../../config/passport")(passport);

//@route POST api/users/register
// @desc Register user
// @access public
router.post("/register", register);

//@route POST api/users/login
// @desc LOGIN user
// @access public
router.post("/login", login);

//@route GET api/users/current
// @desc test user routes
// @access public
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);

//@route POST /api/users/logout
//@desc Logging the user out
//@access private
router.get("/logout", passport.authenticate("jwt", { session: false }), logout);

//@route POST /api/users/refresh
//@desc Logging the user out
//@access private
router.post("/refresh", tokenRefresh);
module.exports = router;
