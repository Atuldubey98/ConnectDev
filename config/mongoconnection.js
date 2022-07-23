const mongoose = require("mongoose");
const MONGO_URI = require("./keys").MONGO_URI;
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");
const catchAsyncErrors = require("../api/middlewares/catchAsyncErrors");

try{
  mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
}catch(e){
  console.log(e);
}
mongoose.connection.on("connected", () => {
  let db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(mongoose.connections[0].db, {
    bucketName: "avatar"
  });
});
const storage = new GridFsStorage({
  url:MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      console.log(file);
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "avatar"
      };
      resolve(fileInfo);
    });
  },
});

exports.getAvatarImage=catchAsyncErrors(async(req, res, next)=>{
  const file = bucket
    .find({
      filename : req.params.filename
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404)
          .json({
            err: "no files exist"
          });
      }
      bucket.openDownloadStreamByName(req.params.filename)
        .pipe(res);
    });
})

exports.upload = multer({ storage });