const winston = require("winston");
const format = winston.format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "http";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const myFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const transports = [
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new winston.transports.File({
    filename: "logs/all.log",
    format: myFormat,
  }),
];

if (process.env.NODE_ENV == "development") {
  transports.push(
    new winston.transports.Console({
      format: format.combine(format.colorize({ all: true }), myFormat),
    })
  );
}

const Logger = winston.createLogger({
  level: level(),
  levels,
  myFormat,
  transports,
});

module.exports = Logger;
