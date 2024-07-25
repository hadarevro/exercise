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

module.exports = { getUrls, addUrl };
