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
} = require("../controller/userController");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
router.get("/", isAuthenticated, getCurrentUserProfile);
router.get("/profile", isAuthenticated, getProfile)
      .post("/profile",isAuthenticated, postProfile)
      .patch("/profile",isAuthenticated,updateProfile);
module.exports = router;
