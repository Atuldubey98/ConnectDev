const mongoose = require("mongoose");
const MONGO_URI = require("./keys").MONGO_URI;
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");
const catchAsyncErrors = require("../api/middlewares/catchAsyncErrors");

try{
  mongoose
  .connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false});
}catch(e){
  console.log(e);
}
mongoose.connection.on("connected", () => {
  console.log("Database connected");
});
const storage = new GridFsStorage({
  url:MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "avatar"
      };
      resolve(fileInfo);
    });
  },
});
module.exports=upload=multer({storage});