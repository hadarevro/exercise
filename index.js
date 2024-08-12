const { dbConnection } = require("./api/database/connection");
const { startServer } = require("./server");
const config = require("./config/config");

require("dotenv").config();

const startServices = async () => {
  const connection = dbConnection.createDbConnection(
    config.db.databaseName,
    config.db.userName,
    config.db.databasePassword,
    config.db.host,
    config.db.dialect || "postgres"
  );
  await dbConnection.checkConnectionToDb(connection);
  await dbConnection.createTableByModel(connection);
  await dbConnection.disconnectFromDb(connection);
  startServer();
};

startServices();
