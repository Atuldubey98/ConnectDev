const { Router } = require("express");
const router = Router();
const cloudinaryMulter = require("../middlewares/cloudinaryMulter");
const { isAuthenticated } = require("../../utils/auth");
const {
  postProfile,
  getProfile,
  updateProfile,
  uploadProfilePhotoController,
  getRandomUserProfile,
  updateUploadedProfilePicture,
} = require("../controller/profileController");

router
  .get("/", isAuthenticated, getProfile)
  .post("/", isAuthenticated, postProfile)
  .patch("/", isAuthenticated, updateProfile);
router.post(
  "/avatar",
  isAuthenticated,
  cloudinaryMulter.single("avatar"),
  uploadProfilePhotoController
);
router.patch(
  "/avatar",
  isAuthenticated,
  cloudinaryMulter.single("avatar"),
  updateUploadedProfilePicture
);
router.get("/random-user/:_id", isAuthenticated, getRandomUserProfile);
module.exports = router;
