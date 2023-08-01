const { MONGO_URI } = require("./config/keys");
const express = require("express");
const errorMiddleware = require("./api/middlewares/error");

const loadMiddlewares = require("./api/middlewares/loadMiddleware");
const router = require("./api/routes/index");
const mongoose = require("mongoose");
const helmet = require("helmet");

const app = express();
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      imgSrc: ["'self'", "https://res.cloudinary.com", "https://robohash.org"],
    },
  })
);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/api/health", (req, res) => {
  return res.status(200).send("Server is healthy");
});
loadMiddlewares(app);
router(app);
app.use(errorMiddleware);

app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});
module.exports = app;
