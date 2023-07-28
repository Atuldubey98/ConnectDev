const ErrorHandler = require("../../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  if (process.env.NODE_ENV === "development") {
    console.log(err.name);
  }
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  // Wrong JWT error
  if (err.name === "JWEInvalid" || err.name === "JWTExpired") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 401);
  }
  if (err.name === "ValidationError") {
    err = new ErrorHandler("PAYLOAD ERROR", 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
