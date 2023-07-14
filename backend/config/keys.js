const dotenv = require("dotenv");
const path =
  process.env.NODE_ENV == "development"
    ? "../.env.development"
    : process.env.NODE_ENV == "test"
    ? "../.env.test"
    : "../.env";
dotenv.config({
  path,
});
module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  SECRET_KEY: process.env.SECRET_KEY,
  APP_URL: process.env.APP_URL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  NODE_ENV: process.env.NODE_ENV,
  VITE_APP_URL: process.env.VITE_APP_URL,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
