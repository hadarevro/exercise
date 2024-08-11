const {
  checkConnectionToDb,
  createDbConnection,
  createTableByModel,
  disconnectFromDb,
} = require("./api/database/connection");
const { startServer } = require("./server");

require("dotenv").config();

const startServices = async () => {
  const connection = createDbConnection(
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
