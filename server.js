const express = require("express");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 9000;
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// DB config
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Connect to mongofb

// Passport middleware
app.use(passport.initialize());
// Passport Config
// Use Routes

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});
app.listen(port, () => {
  console.log(`Server is Listening on ${port}`);
});
