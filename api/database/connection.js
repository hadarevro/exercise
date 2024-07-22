const { Client } = require('pg');

require("dotenv").config();
    
let postgreClient;

const createClient = () => {
    postgreClient = new Client({
        user: process.env.USER_NAME,
        host:  process.env.HOST,
        database:  process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.POSTGRE_SQL_PORT,
    });
}

const connectToDb = async () => { 
    createClient();   
    try{
        await postgreClient.connect();
        console.log('Connected to PostgreSQL database');
    }
    catch(error){
        console.error('connection to PostgreSQL database failed ',error)
    }
    finally{
        await client.end();
    }
}

module.exports = connectToDb;