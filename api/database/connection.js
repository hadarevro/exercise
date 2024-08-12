const { Sequelize } = require("sequelize");

require("dotenv").config();

const createDbConnection = (
  databaseName,
  userName,
  databasePassword,
  dbHost,
  dbDialect,
  poolMax,
  poolMin,
  poolIdle
) => {
  const connection = new Sequelize(databaseName, userName, databasePassword, {
    host: dbHost,
    dialect: dbDialect,
    pool: {
      max: poolMax,
      min: poolMin,
      idle: poolIdle,
    },
  });
  return connection;
};

const checkConnectionToDb = async (sequelize) => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgresSQL database");
  } catch (error) {
    console.error("Connection to PostgresSQL database failed", error);
  }
};

const createTableByModel = async (sequelize) => {
  try {
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Couldn't synchronized models", error);
  }
};

module.exports = {
  checkConnectionToDb,
  createDbConnection,
  createTableByModel,
};
