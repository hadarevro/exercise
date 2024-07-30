const Sequelize = require("sequelize");
const { sequelize } = require("../database/connection");

const Url = sequelize.define("urlMocks", {
  urlId: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  originUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shortUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const urlToInsert = {
  originUrl: "asdfgghj",
  shortUrl: "asd",
};

module.exports = { urlToInsert, Url };
