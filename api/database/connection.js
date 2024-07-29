const { Sequelize } = require("sequelize");

const Url = require("../models/url");

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.USER_NAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  }
);

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL database");
  } catch (error) {
    console.error("Connection to PostgreSQL database failed", error);
    process.exit(1);
  }
};

const createTableByModel = async () => {
  try {
    Url.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Couldn't synchronized models", error);
  }
};

module.exports = { connectToDb, sequelize, createTableByModel };
