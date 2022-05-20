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
              expiresIn: 300,
            },
            (err, token) => {
              if (err) {
                console.log(err);
                return res.status(400).json({
                  error: err,
                });
              }
              jwt.sign(
                payload,
                keys.SECRET_KEY,
                {
                  expiresIn: 3600,
                },
                async (error, refreshToken) => {
                  if (error) {
                    return res.status(400).json({
                      ...error,
                    });
                  }
                  const rf = await Token.findOne({ user: user._id });
                  if (!rf) {
                    const newToken = new Token({
                      refreshToken,
                      user: user._id,
                    });
                    await newToken.save(newToken);
                  } else {
                    await Token.findOneAndUpdate(
                      { _id: rf._id },
                      { refreshToken }
                    );
                  }
                  return res.status(200).json({
                    success: true,
                    accessToken: "Bearer " + token,
                    refreshToken,
                  });
                }
              );
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
};

const getCurrentUser = (req, res) => {
  return res.status(200).json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
};

const tokenRefresh = (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!jwt.verify(refreshToken, keys.SECRET_KEY, { expires: 3600 })) {
      return res.status(400).json({ status: false });
    }
    const payload = {
      id: req.user.id,
      name: req.user.name,
      avatar: req.user.avatar,
    }; // Create a payload
    // Sign token
    jwt.sign(
      payload,
      keys.SECRET_KEY,
      {
        expiresIn: 300,
      },
      (err, token) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: err,
          });
        }
        jwt.sign(
          payload,
          keys.SECRET_KEY,
          {
            expiresIn: 3600,
          },
          async (error, refreshToken) => {
            if (error) {
              return res.status(400).json({
                ...error,
              });
            }
            const rf = await Token.findOne({ user: user._id });
            if (!rf) {
              const newToken = new Token({
                refreshToken,
                user: user._id,
              });
              await newToken.save();
            } else {
              await Token.findOneAndUpdate({ _id: rf._id }, { refreshToken });
            }
            return res.status(200).json({
              success: true,
              accessToken: "Bearer " + token,
              refreshToken,
            });
          }
        );
      }
    );
  } catch (error) {
    return res.status(400).json({ status: false });
  }
};

const logout = (req, res) => {
  req.logOut();
  return res
    .status(200)
    .json({ status: false, message: "User Success fully logged out" });
};
module.exports = { register, login, getCurrentUser, logout, tokenRefresh };
