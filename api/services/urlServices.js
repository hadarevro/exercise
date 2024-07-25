const postgreClient = require("../database/connection");

const getUrls = () => {
  return postgreClient.query("SELECT * FROM urls");
};

module.exports = getUrls;
