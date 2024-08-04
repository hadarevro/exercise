const Sequelize = require("sequelize");
const { createDbConnection } = require("../../database/connection");
const sequelize = createDbConnection();

const UrlMocokTable = sequelize.define("urlMocks", {
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

const urlsData = {
  urlId: "asdfbhjhgfw345tgf",
  originUrl: "originllongurl",
  shortUrl: "short",
};

module.exports = { urlToInsert, UrlMocokTable, urlsData };
