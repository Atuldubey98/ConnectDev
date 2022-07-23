const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("./config/mongoconnection");
app.use(cookieParser());
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
const port = process.env.PORT || 9000;
const user = require("./api/routes/user");
const profile = require("./api/routes/profile");
const post = require("./api/routes/post");

const errorMiddleware = require("./api/middlewares/error");

// DB config


// Use Routes
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

app.listen(port, () => {
  console.log(`Server is Listening on ${port}`);
});
