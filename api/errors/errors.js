class URLS_ERROR extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "URLS_ERROR";
    this.statusCode = statusCode;
  }
}

module.exports = { URLS_ERROR };
