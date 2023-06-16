const app = require("./app");
const http = require("http");
const { PORT, APP_URL } = require("./config/keys");
const server = http.createServer(app);
const { Server } = require("socket.io");
const logger = require("./utils/logger");
const Post = require("./models/Post");
const authenticationHandler = require("./api/handlers/authenticationHandler");
const roomJoinHandler = require("./api/handlers/roomJoinHandler");
const likePostHandler = require("./api/handlers/likePostHandler");
const friendRequestHandler = require("./api/handlers/friendRequestHandler");
const commentHandler = require("./api/handlers/commentHandler");
const io = new Server(server, {
  cors: {
    origin: [APP_URL, "http://192.168.1.15:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  cookie: true,
  transports: ["polling"],
});
io.use(authenticationHandler);
io.on("connection", async (socket) => {
  socket.on("join", roomJoinHandler(socket));
  const { friendRequestSend, friendRequestAccept, friendRequestCancel } =
    friendRequestHandler(socket, io);

  socket.on("like", likePostHandler(socket, io));
  socket.on("friendRequest:send", friendRequestSend);
  socket.on("friendRequest:accept", friendRequestAccept);
  socket.on("friendRequest:cancel", friendRequestCancel);
  socket.on("comment", commentHandler(socket, io));
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
