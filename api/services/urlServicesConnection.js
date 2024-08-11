const {
  checkConnectionToDb,
  createDbConnection,
} = require("../database/connection");
const config = require("../../config/config");

const connectToDb = async () => {
  const connection = await createDbConnection(
    config.db.databaseName,
    config.db.userName,
    config.db.databasePassword,
    config.db.host,
    config.db.dialect || "postgres"
  );
  await checkConnectionToDb(connection);
  return connection;
};

module.exports = {
  connectToDb,
};
