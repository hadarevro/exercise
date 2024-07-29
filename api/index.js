const startServer = require("./server");
const { connectToDb, createTableByModel } = require("./database/connection");

const startServices = async () => {
  startServer();
  connectToDb();
  createTableByModel();
};

startServices();
