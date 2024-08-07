const Sequelize = require("sequelize");
const { createDbConnection } = require("../database/connection");

const sequelize = createDbConnection();

const getUrlTable = (tableName) => {
  const UrlTable = sequelize.define(tableName, {
    urlId: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    originUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    shortUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return UrlTable;
};

module.exports = { getUrlTable };
