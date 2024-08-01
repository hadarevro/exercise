const startServer = require("./server");
const {
  connectToDb,
  createTableByModel,
} = require("./api/database/connection");

const startServices = async () => {
  startServer();
  await connectToDb();
  await createTableByModel();
};

await startServices();
