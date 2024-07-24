const { Client } = require("pg");

require("dotenv").config();

let postgreClient;

const createClient = () => {
  return new Client({
    user: process.env.USER_NAME,
    host: process.env.HOST,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.POSTGRE_SQL_PORT,
  });
};

const connectToDb = async () => {
  postgreClient = createClient();
  try {
    await postgreClient.connect();
    await client.query(`DROP DATABASE IF EXISTS ${process.env.DATABASE_NAME};`);
    await client.query(`CREATE DATABASE ${process.env.DATABASE_NAME};`);
    console.log("Connected to PostgreSQL database");
    await client.end();
  } catch (error) {
    console.error("Connection to PostgreSQL database failed ", error);
    process.exit(1);
  }
};

module.exports = connectToDb;
