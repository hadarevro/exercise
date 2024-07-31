const startServer = require("./api/server");
const {
  connectToDb,
  createTableByModel,
} = require("./api/database/connection");

const startServices = async () => {
  startServer();
  connectToDb();
  createTableByModel();
};

startServices();
