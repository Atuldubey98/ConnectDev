const cors = require("cors");
const { APP_URL } = require("../../config/keys");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

function loadMiddlewares(app) {
  app.use(morgan("combined"));
  const corsOptions = {
    origin: function (origin, callback) {
      if (
        !origin ||
        [APP_URL, "http://localhost:9000"].indexOf(origin) !== -1
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
}
module.exports = loadMiddlewares;
