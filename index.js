const {
  checkConnectionToDb,
  createDbConnection,
  createTableByModel,
  disconnectFromDb,
} = require("./api/database/connection");
const { startServer } = require("./server");
const config = require("./config/config");

require("dotenv").config();

const startServices = async () => {
  const connection = createDbConnection(
    config.databaseName,
    config.userName,
    config.databasePassword,
    config.host,
    config.dialect || "postgres"
  );
  await checkConnectionToDb(connection);
  await createTableByModel(connection);
  await disconnectFromDb(connection);
  startServer();
};

startServices();
