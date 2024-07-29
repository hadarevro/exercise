const Sequelize = require("sequelize");
const { sequelize } = require("../database/connection");

const Url = sequelize.define("url", {
  urlId: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  originUrl: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  shortUrl: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Url;
