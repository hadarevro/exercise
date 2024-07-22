require("dotenv").config()

module.exports = {
    port: process.env.PORT,
    userName: process.env.USER_NAME,
    host: process.env.HOST,
    databaseName: process.env.DATABASE_NAME,
    databasePassword: process.env.DATABASE_PASSWORD
}