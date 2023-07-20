const { parse } = require("cookie");
const ErrorHandler = require("../../utils/errorhandler");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/keys");
const { decryptTokenAndGetUser } =
  require("../repository/encryptionRepository")();
async function authenticationHandler(socket, next) {
  const fetchedToken = socket.handshake.headers.cookie;
  if (fetchedToken) {
    const token = parse(fetchedToken).token;
    if (!token) {
      next(new ErrorHandler("UNAUTHORIZED", 401));
    }
    if (token) {
      try {
        const decodedData = await decryptTokenAndGetUser(token);
        socket.user = decodedData;
        next();
      } catch (error) {
        next(new ErrorHandler("UNAUTHORIZED", 401));
      }
    }
  } else {
    next(new ErrorHandler("UNAUTHORIZED", 401));
  }
}

module.exports = authenticationHandler;
