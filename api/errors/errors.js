const { StatusCodes } = require("http-status-codes");

class NO_URLS_FOUND_ERROR extends Error {
  constructor(message) {
    super(message);
    this.name = "NO_URLS_FOUND_ERROR";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

const handleNoUrlsFound = (res, error) => {
  const message =
    error.statusCode === StatusCodes.NOT_FOUND
      ? error.message
      : "Failed to get all urls";
  console.error(message);
  const statusCode =
    error.statusCode === StatusCodes.NOT_FOUND
      ? error.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR;
  return res.status(statusCode).send({ message: message });
};

module.exports = { NO_URLS_FOUND_ERROR, handleNoUrlsFound };
