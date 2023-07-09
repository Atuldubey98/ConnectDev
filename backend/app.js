const { MONGO_URI } = require("./config/keys");
const express = require("express");
const errorMiddleware = require("./api/middlewares/error");
const user = require("./api/routes/user");
const profile = require("./api/routes/profile");
const post = require("./api/routes/post");
const loadMiddlewares = require("./api/middlewares/loadMiddleware");
const notificationRouter = require("./api/routes/notification");
const friendRequestRouter = require("./api/routes/friendRequest");
const { isAuthenticated } = require("./utils/auth");
const {
  getCurrentUserAllFriends,
} = require("./api/controller/friendRequestController");
const mongoose = require("mongoose");
const contactRouter = require("./api/routes/contact");
const chatRouter = require("./api/routes/chat");
const app = express();
mongoose.connect(MONGO_URI);

loadMiddlewares(app);
app.get("/api/health", (req, res) => {
  return res.status(200).send("Server is healthy");
});
app.use("/api/users", user);
app.use("/api/posts", post);
app.use("/api/profile", profile);
app.use("/api/notifications", notificationRouter);
app.use("/api/friend-request", friendRequestRouter);
app.use("/api/contacts", contactRouter);
app.use("/api/chats", chatRouter);
app.use("/api/friends", isAuthenticated, getCurrentUserAllFriends);
app.use(errorMiddleware);

app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});
module.exports = app;
