const startServer = require("./server");
const {
  checkConnectionToDb,
  createDbConnection,
  createTableByModel,
  disconnectFromDb,
} = require("./api/database/connection");

const startServices = async () => {
  const connection = await createDbConnection();
  await checkConnectionToDb(connection);
  await createTableByModel(connection);
  await disconnectFromDb(connection);
  startServer();
};

startServices().then();
