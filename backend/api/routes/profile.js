const { Router } = require("express");
const router = Router();
const { isAuthenticated } = require("../../utils/auth");
const {
  postProfile,
  getProfile,
  updateProfile,
  getRandomUserProfile,
} = require("../controller/profileController");

router
  .get("/", isAuthenticated, getProfile)
  .post("/", isAuthenticated, postProfile)
  .patch("/", isAuthenticated, updateProfile);

router.get("/random-user/:_id", isAuthenticated, getRandomUserProfile);
module.exports = router;
