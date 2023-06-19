const { Schema, model } = require("mongoose");

const CloudinaryPhotosMetaSchema = new Schema({
  contextId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  publicId: {
    unique: true,
    type: String,
    required: true,
  },
});

module.exports = CloudinaryPhotos = model(
  "cloudinary",
  CloudinaryPhotosMetaSchema
);
