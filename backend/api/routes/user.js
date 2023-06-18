const { Router } = require("express");
const router = Router();
const { isAuthenticated } = require("../../utils/auth");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUserProfile,
  searchUser,
} = require("../controller/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", isAuthenticated, logoutUser);

router.get("/", isAuthenticated, getCurrentUserProfile);

router.get("/search/:search", isAuthenticated, searchUser);
module.exports = router;
