const { createDbConnection } = require("../database/connection");
const config = require("../../config/config");

const sequelize = createDbConnection(
  config.db.databaseName,
  config.db.userName,
  config.db.databasePassword,
  config.db.host,
  config.db.dialect || "postgres"
);

const getUrlTable = (tableName) => {
  const UrlTable = sequelize.define(tableName, config.table);
  return UrlTable;
};

module.exports = { getUrlTable };
