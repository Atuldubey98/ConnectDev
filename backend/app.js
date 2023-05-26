require("./config/mongoconnection");
const express = require("express");
const errorMiddleware = require("./api/middlewares/error");
const user = require("./api/routes/user");
const profile = require("./api/routes/profile");
const post = require("./api/routes/post");
const chatRouter = require("./api/routes/chat");
const loadMiddlewares = require("./api/middlewares/loadMiddleware");
const app = express();
loadMiddlewares(app);
app.get("/api/health", (req, res, next) => {
  return res.status(200).send("Server is healthy");
});
app.use("/api/users", user);
app.use("/api/post", post);
app.use("/api/profile", profile);
app.use("/api/chat", chatRouter);
app.use(errorMiddleware);

app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});
module.exports = app;
