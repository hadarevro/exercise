const Sequelize = require("sequelize");
const { createDbConnection } = require("../database/connection");

const sequelize = createDbConnection();

const getUrlTable = () => {
  const tableName =
    process.env.NODE_ENV === "test"
      ? process.env.TEST_TABLE_NAME
      : process.env.DEV_TABLE_NAME;

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
