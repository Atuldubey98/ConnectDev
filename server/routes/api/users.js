const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
require("../../config/passport")(passport);

//@route POST api/users/register
// @desc Register user
// @access public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          error: "Email already exist",
        });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", // Size
          r: "pg", // Rating
          default: "mm", // Default
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password,
        });
        bcrypt.genSalt(10, (error, salt) => {
          if (error) {
            console.log(error);
            return;
          }
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.json({
                  message: "User Created",
                  user: user,
                });
              })
              .catch((err) => {
                res.status(404).json({
                  error: err,
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: err });
    });
});

//@route POST api/users/login
// @desc LOGIN user
// @access public

router.post("/login", (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        // Check for the user
        return res.status(400).json({
          error: "Email doesn't exist",
        });
      }
      // checking the password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User matched
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
          }; // Create a payload
          // Sign token
          jwt.sign(
            payload,
            keys.SECRET_KEY,
            {
              expiresIn: 3600,
            },
            (err, token) => {
              if (err) {
                console.log(err);
                return res.status(400).json({
                  error: err,
                });
              } else {
                res.status(200).json({
                  success: true,
                  token: "Bearer " + token,
                });
              }
            }
          );
        } else {
          return res.status(400).json({
            message: "Password Incorrect",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err,
      });
    });
});

//@route GET api/users/test
// @desc test user routes
// @access public

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

//@route POST /api/users/logout
//@desc Logging the user out
//@access private

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.logOut();
    return res
      .status(200)
      .json({ status: false, message: "User Success fully logged out" });
  }
);

module.exports = router;
