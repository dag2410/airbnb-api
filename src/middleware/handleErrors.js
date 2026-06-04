const response = require("../utils/response");

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  response.error(res, error.status ?? 500, error.toString(), error.errors);
}
module.exports = errorHandler;
