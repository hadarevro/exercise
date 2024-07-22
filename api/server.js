const express = require('express');
const cors = require('cors');

require("dotenv").config();
const app = express();

const listenToServer = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
}

const startServer = () => {
  app.use(cors());
  app.use(express.json());
  // app.use('/urls', );

  listenToServer();
}

module.exports = startServer;