const multer = require("multer");
const path = require("path");
const cloudinary = require("../../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
module.exports = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "avatar",
    },
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("UNSUPPORTED"), false);
      return;
    }
    cb(null, true);
  },
});
