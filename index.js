const {
  checkConnectionToDb,
  createDbConnection,
  createTableByModel,
} = require("./api/database/connection");
const { startServer } = require("./server");
const config = require("./config/config");

require("dotenv").config();

const startServices = async () => {
  const connection = createDbConnection(
    config.db.databaseName,
    config.db.userName,
    config.db.databasePassword,
    config.db.host,
    config.db.dialect || "postgres",
    config.pool.max,
    config.pool.min,
    config.pool.idle
  );
  await checkConnectionToDb(connection);
  await createTableByModel(connection);
  startServer();
};

startServices();
