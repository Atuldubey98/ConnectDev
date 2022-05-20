const mongoose = require("mongoose");
const db = require("./keys").MONGO_URI;
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");

const promise = mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology : true
  })
  .then(() => mongoose.connection.db)
  .catch((err) => {
    console.log(err);
  });

const storage = new GridFsStorage({
  db: promise,
  file: (req, file) => {
    if (file.memetype === "image/jpeg" || file.memetype === "image/jpg") {
      return {
        bucketName: "posts",
        fileName: "file_" + Date.now(),
      };
    } else {
      return null;
    }
  },
});

module.exports = upload = multer({ storage });
