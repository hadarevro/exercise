const startServer = require("./server");
const {
  checkConnectionToDb,
  createDbConnection,
  createTableByModel,
  disconnectFromDb,
} = require("./api/database/connection");

require("dotenv").config();

const startServices = async () => {
  const connection = await createDbConnection(
    process.env.DATABASE_NAME,
    process.env.USER_NAME,
    process.env.DATABASE_PASSWORD,
    process.env.HOST,
    process.env.DIALECT
  );
  await checkConnectionToDb(connection);
  await createTableByModel(connection);
  await disconnectFromDb(connection);
  startServer();
};

startServices();
