const { isAuthenticated } = require("../../utils/auth");
const userRouter = require("./user");
const postRouter = require("./post");
const notificationRouter = require("./notification");
const contactRouter = require("./contact");
const friendRequestRouter = require("./friendRequest");
const chatRouter = require("./contact");
const profileRouter = require("./profile");
const {
  getCurrentUserAllFriends,
} = require("../controller/friendRequestController");

function router(app) {
  app.use("/api/users", userRouter);
  app.use("/api/posts", postRouter);
  app.use("/api/profile", profileRouter);
  app.use("/api/notifications", notificationRouter);
  app.use("/api/friend-request", friendRequestRouter);
  app.use("/api/contacts", contactRouter);
  app.use("/api/chats", chatRouter);
  app.use("/api/friends", isAuthenticated, getCurrentUserAllFriends);
}

module.exports = router;
