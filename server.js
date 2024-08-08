const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./api/specification/swagger.json");
const urlRouter = require("./api/routes/urls");
const handleNoUrlsFoundError = require("./api/middlewares/urlsMiddlewares");

require("dotenv").config();

const app = express();

const listenToServer = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
};

const startServer = () => {
  app.use(cors());
  app.use(express.json());
  app.use("/url", urlRouter);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(handleNoUrlsFoundError);
  listenToServer();
  return app;
};

module.exports = startServer;
