const server = require("./config/express");
const Logger = require("./server/utilities/logger");

server.listen(process.env.PORT, () => {
  Logger.info(`server started on port ${process.env.PORT} (${process.env.NODE_ENV})`);
});

module.exports = server;
