require("dotenv").config();

module.exports = {
  config: {
    db: {
      port: process.env.PORT,
      userName: process.env.USER_NAME,
      databaseName: process.env.DATABASE_NAME,
      databasePassword: process.env.DATABASE_PASSWORD,
      dialect: process.env.POSTGRES,
      tableName: process.env.TABLE_NAME,
    },
  },
};
