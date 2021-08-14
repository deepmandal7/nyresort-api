const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");

/** ====== DotENV configuration */
dotenv.config({ path: require("find-config")(".env") });

const configurations = {
  production: { ssl: true, port: process.env.PORT, hostname: "" },
  development: { ssl: false, port: process.env.PORT, hostname: process.env.STAGE_HOSTNAME },
};

const environment = process.env.NODE_ENV || "development";
const config = configurations[environment];

const uri = require("./database");

const { morganMiddleware, responseHandlerMiddleware } = require("../server/middlewares");

const api = require("../server/routes");

const app = express();

// const credentials = {
//   key: fs.readFileSync(path.resolve(__dirname, "../../ssl/private.key")),
//   cert: fs.readFileSync(path.resolve(__dirname, "../../ssl/certificate.crt")),
//   ca: fs.readFileSync(path.resolve(__dirname, "../../ssl/ca_bundle.crt")),
// };

let server;

config.ssl ? (server = http.createServer(app)) : (server = http.createServer(app));

app.options("*", cors());
app.use(morganMiddleware);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(
//   session({
//     store: MongoStore.create({ mongoUrl: uri }),
//     saveUninitialized: true,
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
//     },
//   })
// );

// require("./passport");

// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/", api);
app.use(responseHandlerMiddleware);

module.exports = server;
