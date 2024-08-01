const { Sequelize } = require("sequelize");
require("dotenv").config();

const createDbConnection = () => {
  return new Sequelize(
    process.env.DATABASE_NAME,
    process.env.USER_NAME,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.HOST,
      dialect: process.env.DIALECT,
    }
  );
};

const checkConnectionToDb = async (sequelize) => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL database");
  } catch (error) {
    console.error("Connection to PostgreSQL database failed", error);
    throw error;
  }
};

const disconnectFromDb = async (sequelize) => {
  try {
    await process.on("SIGINT", () => sequelize.close());
    console.log("Disconnected from postgres db");
  } catch (error) {
    console.error("Failed to close the connection to db");
    throw error;
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
  disconnectFromDb,
};
