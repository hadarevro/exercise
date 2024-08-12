const { createDbConnection } = require("../database/connection");
const config = require("../../config/config");

const sequelize = createDbConnection(
  config.db.databaseName,
  config.db.userName,
  config.db.databasePassword,
  config.db.host,
  config.db.dialect || "postgres",
  config.pool.max,
  config.pool.min,
  config.pool.idle
);

const getUrlTable = (tableName) => {
  try {
    const UrlTable = sequelize.define(tableName, config.model);
    return UrlTable;
  } catch (error) {
    console.error("Failed to create Urls table", error);
  }
};

module.exports = { getUrlTable };
