const app = require("./app");
const http = require("http");
const { PORT, APP_URL, JWT_SECRET } = require("./config/keys");
const server = http.createServer(app);
const { Server } = require("socket.io");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const logger = require("./utils/logger");
const Post = require("./models/Post");
const { parse } = require("cookie");
const ErrorHandler = require("./utils/errorhandler");
const Notification = require("./models/Notification");
const FriendRequest = require("./models/FriendRequest");

const io = new Server(server, {
  cors: {
    origin: [APP_URL, "http://192.168.1.15:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  cookie: true,
  transports: ["polling"],
});
io.use((socket, next) => {
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
});
io.on("connection", async (socket) => {
  socket.on("join", async (data) => {
    const { type, _id } = data;
    socket.join(`${type}:` + _id);
  });

  socket.on("like", async (data) => {
    const { _id, liked } = data;
    const post = await Post.findById(_id).select("likes user");
    if (!post) {
      logger.error({
        level: "info",
        message: `Post not found with id ${_id}`,
      });
      io.to("post:" + _id).emit("notify:error", {
        message: `Post was deleted`,
      });
    } else {
      if (socket.user.id !== post.user.toString()) {
        logger.info({
          level: "info",
          message: `${socket.user.id} liked post with id---- >${_id} of ${post.user}`,
        });

        const { likes } = post;
        const message =
          likes.length > 1
            ? `${socket.user.name} & ${likes.length - 1} others liked your post`
            : `${socket.user.name} liked your post`;
        const href = `/posts/${_id}`;
        const response = { user: socket.user, post: _id };
        if (liked) {
          io.to("post:" + _id).emit("like", response);
          const notification = new Notification({
            user: post.user.toString(),
            href,
            message,
          });
          await notification.save();
          io.to("post:" + _id).emit("notify:success", notification);
        } else {
          io.to("post:" + _id).emit("unlike", response);
        }
      }
    }
  });
  socket.on("friendRequest:send", async (friendRequestId) => {
    const friendRequest = await FriendRequest.findById(
      friendRequestId
    ).populate({
      path: "requestor",
      select: "name email _id avatar",
    });
    io.to(friendRequest.recipient.toString()).emit(
      "friendRequest:recieved",
      friendRequest
    );
    logger.info({
      level: "info",
      message: `Friend request sent to ---- >${friendRequest.recipient.toString()} --> ${
        socket.user.name
      }`,
    });
  });
  socket.on("friendRequest:accept", async (friendRequest) => {
    io.to(friendRequest.requestor._id.toString()).emit(
      "friendRequest:accepted",
      `${friendRequest.requestor.name} accepted your friend request`
    );
    logger.info({
      level: "info",
      message: `Friend request accepted by ---- >${friendRequest.recipient.toString()} --> ${
        socket.user.name
      }`,
    });
  });
  socket.on("friendRequest:cancel", async (friendRequest) => {
    io.to(friendRequest.recipient.toString()).emit(
      "friendRequest:cancelled",
      friendRequest._id
    );
    logger.info({
      level: "info",
      message: `Friend request cancelled by ---- >${friendRequest.requestor.toString()} --> ${
        socket.user.name
      }`,
    });
  });
  socket.on("comment", async (data) => {
    const { _id, commentId } = data;
    logger.log({
      level: "info",
      message: `${socket.user.id} commenting on post with id---- >${_id}`,
    });
    const post = await Post.findById(_id).select("comments user");
    if (!post) {
      socket.emit("notify:error", {
        message: `Post was deleted`,
        href: "#",
        isError: true,
      });
    } else {
      const comments = post.comments;
      if (socket.user.id != post.user.toString()) {
        const { name } = await User.findById(socket.user.id).select("name");
        const taggedCommentId = `comment-${commentId}`;
        const message =
          comments.length > 1
            ? `${name} and ${comments.length} others commented on your post`
            : `${name} commented on your post`;
        const href = `/posts/${_id}#${taggedCommentId}`;
        const notification = new Notification({
          user: post.user.toString(),
          href,
          message,
        });
        await notification.save();
        io.to("post:" + _id).emit("notify:success", notification);
      }
    }
  });
  socket.on("disconnect", () => {
    logger.warn({ level: "info", message: `Disconnecting ---- >${socket.id}` });
  });
  try {
    logger.info({
      level: "info",
      message: `Connected ---- >${socket.id} --> ${socket.user.name}`,
    });
    const posts = await Post.find({ user: socket.user.id }).select("_id");
    socket.join(socket.user.id);
    posts.forEach((post) => socket.join("post:" + post._id));
  } catch (error) {
    console.error(error);
  }
});

const port = PORT || 9000;
server.listen(port, "0.0.0.0", () => {
  logger.log({ level: "info", message: `Server running on ${port}` });
});
