require("./config/mongoconnection");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { parse } = require("cookie");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const errorMiddleware = require("./api/middlewares/error");
const user = require("./api/routes/user");
const profile = require("./api/routes/profile");
const post = require("./api/routes/post");
const { isSocketValid } = require("./utils/auth");

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
  const fetchedCookie = socket.handshake.headers.cookie;
  
  next();
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

io.on("connection", (socket) => {});

app.use(cors(corsOptions));
app.use(morgan("combined"));
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
