const { StatusCodes } = require("http-status-codes");

const NO_URLS_FOUND_ERROR = new Error(
  "No urls matching your request found",
  StatusCodes.NOT_FOUND
);

module.exports = { NO_URLS_FOUND_ERROR };
