const app = require("./app");
const http = require("http");
const { PORT, APP_URL } = require("./config/keys");
const server = http.createServer(app);
const { Server } = require("socket.io");
const logger = require("./utils/logger");
const authenticationHandler = require("./api/handlers/authenticationHandler");
const newConnectionHandler = require("./api/handlers/newConnectionHandler");

const io = new Server(server, {
  cors: {
    origin: [APP_URL, "http://192.168.1.15:5173", "http://localhost:9000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  cookie: true,
  transports: ["polling"],
});
io.use(authenticationHandler);
io.on("connection", newConnectionHandler(io));
const port = PORT || 9000;
server.listen(port, "0.0.0.0", () => {
  logger.log({ level: "info", message: `Server running on ${port}` });
});
