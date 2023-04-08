require("./config/mongoconnection");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { parse } = require("cookie");
const http = require("http");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const Post = require("./models/Post");
const { Server } = require("socket.io");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const logger = require("./utils/logger");
const errorMiddleware = require("./api/middlewares/error");
const user = require("./api/routes/user");
const profile = require("./api/routes/profile");
const post = require("./api/routes/post");
const User = require("./models/User");
const chatRouter = require("./api/routes/chat");
const Contact = require("./models/Contact");
const Message = require("./models/Message");
const Room = require("./models/Room");

const port = process.env.PORT || 9000;
const app = express();
const server = http.createServer(app);
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));
const io = new Server(server, {
  cookie: false,
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.use((socket, next) => {
  const fetchedToken = socket.handshake.headers.cookie;
  if (fetchedToken) {
    const token = parse(fetchedToken).token;
    if (!token) {
      next(new Error("Unauthorized request"));
    }
    if (token) {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decodedData;
      next();
    }
  } else {
    next(new Error("Unauthorized request"));
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
    logger.log({
      level: "info",
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
    logger.log({
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
        post,
      });
    }
  });
  socket.on("disconnect", () => {
    logger.log({ level: "info", message: `Disconnecting ---- >${socket.id}` });
  });
  try {
    logger.log({ level: "info", message: `Connecting ---- >${socket.id}` });

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

const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      ["http://localhost:5173", "http://localhost:9000"].indexOf(origin) !== -1
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

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

server.listen(port, () => {
  logger.log({ level: "info", message: `Server running on ${port}` });
});
