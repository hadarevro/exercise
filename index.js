const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const config = require('./config');

require("dotenv").config();

const app = express();

const listenToServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${config.port}`);
  });
}
const startServer = () => {

  app.use(cors());
  app.use('/urls', );

  listenToServer();
}
