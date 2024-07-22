const express = require('express');
const config = require('./config')
require("dotenv").config();

const port = config.port || 3000;

const app = express();

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});