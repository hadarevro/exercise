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

const tryCatch = async (req, res, controller, next) => {
  try {
    await controller;
  } catch (error) {
    next(error);
  }
};


module.exports = handleNoUrlsFoundError;
