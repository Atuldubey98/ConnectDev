const { parse } = require("cookie");
const ErrorHandler = require("../../utils/errorhandler");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/keys");
function authenticationHandler(socket, next) {
  const fetchedToken = socket.handshake.headers.cookie;
  if (fetchedToken) {
    const token = parse(fetchedToken).token;
    if (!token) {
      next(new ErrorHandler("UNAUTHORIZED", 404));
    }
    if (token) {
      const decodedData = jwt.verify(token, JWT_SECRET);
      socket.user = decodedData;
      next();
    }
  } else {
    next(new ErrorHandler("UNAUTHORIZED", 404));
  }
}

module.exports = authenticationHandler;
