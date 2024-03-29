const cors = require("cors");
const { VITE_APP_URL } = require("../../config/keys");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const compression = require("compression");
const express = require("express");
const path = require("path");

function loadMiddlewares(app) {
  app.use(compression({ filter: shouldCompress }));

  function shouldCompress(req, res) {
    if (req.headers["x-no-compression"]) {
      return false;
    }
    return compression.filter(req, res);
  }
  app.use(morgan("dev"));
  const corsOptions = {
    origin: function (origin, callback) {
      if (
        !origin ||
        [
          VITE_APP_URL,
          "http://192.168.1.15:5173",
          "http://localhost:9000",
        ].indexOf(origin) !== -1
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
  app.use(
    express.static(path.join(__dirname, "../../../connectdev-frontend/build"), {
      maxAge: "1y",
    })
  );
  app.use((req, res, next) => {
    if (req.originalUrl.startsWith("/api")) {
      next();
    } else {
      return res.sendFile(
        path.join(__dirname, "../../../connectdev-frontend/build/index.html")
      );
    }
  });
}
module.exports = loadMiddlewares;
