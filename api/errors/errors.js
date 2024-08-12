class URLS_ERROR extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "URLS_ERROR";
    this.statusCode = statusCode;
  }
}

const NOT_FOUND_ERROR_MESSAGE = "No urls matching your request found";

module.exports = { URLS_ERROR, NOT_FOUND_ERROR_MESSAGE };
