const app = require("./app");
const http = require("http");
const { PORT, APP_URL, JWT_SECRET } = require("./config/keys");
const server = http.createServer(app);
const { Server } = require("socket.io");
const User = require("./models/User");
const Contact = require("./models/Contact");
const Message = require("./models/Message");
const Room = require("./models/Room");
const jwt = require("jsonwebtoken");
const logger = require("./utils/logger");
const Post = require("./models/Post");
const { parse } = require("cookie");
const ErrorHandler = require("./utils/errorhandler");

const io = new Server(server, {
  cors: {
    origin: [APP_URL, "http://192.168.1.15:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  cookie: true,
  transports: ["polling"],
});
io.set;
io.use((socket, next) => {
  const fetchedToken = socket.handshake.headers.cookie;
  console.log(fetchedToken);
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
  socket.on("message", async (data) => {
    const { room, msgBody } = data;
    const message = new Message({
      roomId: room._id,
      user: socket.user.id,
      msgBody,
    });
    logger.info({
      level: "log",
      message: `${socket.user.id} messaging to room---- >${room._id}`,
    });
    const newMessage = await message.save();
    await Room.updateOne(
      { _id: room._id },
      {
        $push: {
          messages: newMessage._id,
        },
      }
    );

    const messageFetch = await Message.findById(newMessage._id).populate({
      path: "user",
      select: "name avatar _id email",
    });
    io.to("room:" + room._id).emit("private", messageFetch);
  });
  socket.on("like", async (data) => {
    const { _id, user, liked } = data;
    logger.info({
      level: "info",
      message: `${socket.user.id} liked post with id---- >${_id}`,
    });
    if (socket.user.id !== user) {
      const post = await Post.findById(_id).select("likes");
      const { likes } = post;
      if (liked) {
        io.to("post:" + _id).emit("notify", {
          message: `${likes.length} liked your post`,
          post,
        });
      }
    }
  });
  socket.on("subscribe", async (roomId) => {
    const room = await Room.findById(roomId);
    const users = new Set(room.users);
    const sockets = await io.fetchSockets();
    const requiredSockets = sockets.filter((socket) =>
      users.has(socket.user.id)
    );
    for (const socket of requiredSockets) socket.join(`room:${roomId}`);
  });
  socket.on("comment", async (data) => {
    const { _id, user } = data;
    logger.log({
      level: "info",
      message: `${socket.user.id} commenting on post with id---- >${_id}`,
    });
    if (socket.user.id != user) {
      const { comments } = await Post.findById(_id).select("comments");

      const { name } = await User.findById(user).select("name");
      io.to("post:" + _id).emit("notify", {
        message:
          comments.length > 1
            ? `${name} and ${comments.length} others commented on your post`
            : `${name} commented on your post`,
      });
    }
  });
  socket.on("disconnect", () => {
    logger.warn({ level: "info", message: `Disconnecting ---- >${socket.id}` });
  });
  try {
    logger.info({ level: "info", message: `Connected ---- >${socket.id}` });

    const posts = await Post.find({ user: socket.user.id }).select("_id");
    const chatRooms = await Contact.find({ user: socket.user.id }).select(
      "room"
    );
    chatRooms.forEach(({ room }) => socket.join("room:" + room));
    posts.forEach((post) => socket.join("post:" + post._id));
  } catch (error) {
    console.error(error);
  }
});

const port = PORT || 9000;
server.listen(port, "0.0.0.0", () => {
  logger.log({ level: "info", message: `Server running on ${port}` });
});
