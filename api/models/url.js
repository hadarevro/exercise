const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const Url = sequelize.define("url", {
  urlId: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false,
  },
  originUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Url;
