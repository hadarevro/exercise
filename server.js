const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./api/specification/swagger.json");
const urlRouter = require("./api/routes/urls");
const {
  handleNoUrlsFoundError,
  tryCatch,
} = require("./api/middlewares/urlsMiddlewares");
const config = require("./config/config");

require("dotenv").config();

const app = express();

const listenToServer = () => {
  app.listen(config.db.port, () => {
    console.log(`Server is running on port: ${config.db.port}`);
  });
};

const startServer = () => {
  app.use(cors());
  app.use(express.json());
  app.use("/url", urlRouter);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(tryCatch);
  app.use(handleNoUrlsFoundError);
  listenToServer();
  return app;
};

module.exports = { startServer };
