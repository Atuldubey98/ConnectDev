const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const Token = require("../../models/Token");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
require("../../config/passport")(passport);

const register = (req, res) => {
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
};

const login = (req, res) => {
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
      bcrypt.compare(password, user.password).then(async (isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ error: "Password doesn't match" });
        }
        const refreshToken = jwt.sign(
          {
            id: user.id,
            email: user.email,
            avatar: user.avatar,
          },
          keys.SECRET_KEY,
          { expiresIn: "1d" }
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        const expired_at = new Date();
        expired_at.setDate(expired_at.getDate() + 7);
        const newToken = new Token({
          refreshToken,
          user: user.id,
          expired_at,
        });
        await newToken.save();
        const accessToken = jwt.sign(
          {
            id: user.id,
            email: user.email,
            avatar: user.avatar,
          },
          keys.SECRET_KEY,
          { expiresIn: "60s" }
        );
        res.send({ accessToken: `Bearer ${accessToken}` });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err,
      });
    });
};

const getCurrentUser = (req, res) => {
  return res.status(200).json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
};

const tokenRefresh = async (req, res) => {
  try {
    console.log(req.cookies);
    const refreshToken = req.cookies["refreshToken"];
    const payload = jwt.verify(refreshToken, keys.SECRET_KEY);
    if (!payload) {
      return res.status(401).json({ status: false });
    }
    const dbToken = await Token.find({
      user: payload.id,
      expired_at: { $gte: 18 },
    });
    if (!dbToken) {
      return res.status(401).json({ status: false });
    }
    const accessToken = jwt.sign(
      {
        id: payload.id,
        email: payload.email,
        avatar: payload.avatar,
      },
      keys.SECRET_KEY,
      { expiresIn: "60s" }
    );
    res.send({ accessToken });
  } catch (e) {
    console.log(e);
    res.status(401).json({
      error: e,
    });
  }
};

const logout = (req, res) => {
  req.logOut();
  return res
    .status(200)
    .json({ status: false, message: "User Success fully logged out" });
};
module.exports = { register, login, getCurrentUser, logout, tokenRefresh };
