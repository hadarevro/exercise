const startServer = require("./server");
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
