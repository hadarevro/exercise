const config = require("../../config/config");
const { getUrlTable } = require("../models/url");

const UrlTable = getUrlTable(config.db.tableName);

module.exports = {
  UrlTable
};
