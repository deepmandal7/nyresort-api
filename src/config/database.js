const mongoose = require("mongoose");
const Logger = require("../server/utilities/logger");

const uri = process.env.NODE_ENV === "development" ? process.env.MONGO_LOCAL : process.env.MONGO_URL;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  Logger.info("MongoDB connected.");
});

mongoose.connection.on("error", () => {
  Logger.error("Error connecting to database");
  throw new Error("Unable to connect to database.");
});

mongoose.set("useCreateIndex", true);

module.exports = uri;
