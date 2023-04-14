const { Router } = require("express");
const router = Router();
const { isAuthenticated } = require("../../utils/auth");
const {
  registerUser,
  loginUser,
  logoutUser,
  postProfile,
  getProfile,
  updateProfile,
  getCurrentUserProfile,
  getChatUser,
} = require("../controller/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", isAuthenticated, logoutUser);

router.get("/", isAuthenticated, getCurrentUserProfile);

router.get("/all", isAuthenticated, getChatUser);

module.exports = router;