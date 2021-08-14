const morganMiddleware = require("./morgan.middleware");
// const validateMiddleware = require("./validate.middleware")
const responseHandlerMiddleware = require("./responseHandler.middleware");
// const authMiddleware = require("./auth.middleware")

module.exports = {
  morganMiddleware,
  //   validateMiddleware,
  responseHandlerMiddleware,
  //   authMiddleware,
};
