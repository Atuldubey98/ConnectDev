const mongoose = require("mongoose");
const MONGO_URI = require("./keys").MONGO_URI;
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");
mongoose.connect(MONGO_URI);
const storage = new GridFsStorage({
  url: MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename + "_" + Date.now(),
        bucketName: "avatar",
      };
      resolve(fileInfo);
    });
  },
});

module.exports = upload = multer({ storage });
