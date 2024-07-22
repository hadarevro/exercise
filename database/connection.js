const { Client } = require('pg');
require("dotenv").config();
const config = require('./config');

const PostgreSQLPort = 5432;

const client = new Client({
    user: config.userName,
    host:  config.host,
    database:  config.databaseName,
    password: config.password,
    port: PostgreSQLPort,
});

const connect = async () => {
    try{
        await client.connect();
        console.log('Connected to PostgreSQL database');
    }
    catch(error){
        console.error('connection to PostgreSQL database failed ',error)
    }
    finally{
        await client.end();
    }

}

connect();
