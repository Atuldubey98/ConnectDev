require("./config/mongoconnection");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { parse } = require("cookie");
const http = require("http");
const Post = require("./models/Post");
const { Server } = require("socket.io");
const cors = require("cors");
const jwt = require("jsonwebtoken");

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
const io = new Server(server, {
  cookie: true,
  cors: {
    origin: "http://localhost:3000",
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
  }
});
io.on("connection", async (socket) => {
  try {
    console.log("Connecting --->", socket.id);
    const posts = await Post.find({ user: socket.user.id }).select("_id");
    const chatRooms = await Contact.find({ user: socket.user.id }).select(
      "room"
    );
    chatRooms.forEach(({ room }) => socket.join("room:" + room));
    posts.forEach((post) => socket.join("post:" + post._id));
  } catch (error) {
    console.log(error);
  }
  socket.on("message", async (data) => {
    const { room, msgBody } = data;

    const message = new Message({
      roomId: room._id,
      user: socket.user.id,
      msgBody,
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
    if (socket.user.id !== user) {
      const post = await Post.findById(_id).select("likes");
      const { likes } = post;
      console.log(data);
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
    console.log("Disconnected ---> ", socket.id);
  });
});

const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      ["http://localhost:3000", "http://localhost:9000"].indexOf(origin) !== -1
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(
  morgan("combined", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);
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
  console.log(`Server is Listening on ${port}`);
});
