const postgreClient = require("../database/connection");

const getUrls = () => {
  return postgreClient.query("SELECT * FROM urls");
};

const addUrl = (originalUrl, shortUrl) => {
  postgreClient.query(
    "INSERT INTO urls (originUrl, shortUrl) values ($1, $2) RETURNING *",
    [originalUrl, shortUrl]
  );
};

const getShortUrlByOriginal = (originalUrl) => {
  return postgreClient.query("SELECT * FROM urls WHERE originUrl = $1", [
    originalUrl,
  ]);
};

const modifyUrl = (originalUrl, shortUrl) => {
  postgreClient.query("UPDATE urls SET shortUrl = $1 WHERE originUrl $2", [
    originalUrl,
    shortUrl,
  ]);
};

module.exports = { getUrls, addUrl, getShortUrlByOriginal };
