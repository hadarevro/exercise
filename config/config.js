require("dotenv").config();

const config = {
  databaseName: process.env.DATABASE_NAME,
  port: process.env.PORT,
  userName: process.env.USER_NAME,
  databasePassword: process.env.DATABASE_PASSWORD,
  dialect: process.env.POSTGRES,
  tableName: process.env.TABLE_NAME,
  host: process.env.HOST,
};

module.exports = config;
