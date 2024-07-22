const startServer = require("./server");
const connectToDb = require("./database/connection");

const startServices = async () => {
    startServer();
    connectToDb();
}

startServices();