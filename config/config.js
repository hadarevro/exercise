const Sequelize = require("sequelize");

require("dotenv").config();

const config = {
  db: {
    databaseName: process.env.DATABASE_NAME,
    port: process.env.PORT,
    userName: process.env.USER_NAME,
    databasePassword: process.env.DATABASE_PASSWORD,
    dialect: process.env.POSTGRES,
    tableName: process.env.TABLE_NAME,
    host: process.env.HOST,
  },
  model: {
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
  },
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
  },
};

module.exports = config;
