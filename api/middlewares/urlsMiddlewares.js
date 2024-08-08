const { StatusCodes } = require("http-status-codes");

const handleNoUrlsFoundError = (error, req, res, next) => {
  const message =
    error.statusCode === StatusCodes.NOT_FOUND
      ? error.message
      : "Failed to get all urls";
  console.error(message);
  const statusCode =
    error.statusCode === StatusCodes.NOT_FOUND
      ? error.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode).send({ message: message });
};

module.exports = handleNoUrlsFoundError;
