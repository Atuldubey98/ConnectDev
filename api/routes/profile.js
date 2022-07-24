const { Router } = require("express");
const router = Router();
const { isAuthenticated } = require("../../utils/auth");
const upload = require('../../config/mongoconnection');
const {
  postProfile,
  getProfile,
  updateProfile,
  uploadAvatar,
  getAvatarImage,
} = require("../controller/profileController");

router.get("/", isAuthenticated, getProfile)
      .post("/",isAuthenticated, postProfile)
      .patch("/",isAuthenticated,updateProfile);

router.post("/avatar", isAuthenticated , upload.single('avatar'), uploadAvatar);
router.get("/avatar/:filename", getAvatarImage);


module.exports = router;