const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  SECRET_KEY: process.env.SECRET_KEY,
  REACT_APP_URL: process.env.REACT_APP_URL,
  IPV4_REACT_APP_URL: process.env.IPV4_REACT_APP_URL,
};
