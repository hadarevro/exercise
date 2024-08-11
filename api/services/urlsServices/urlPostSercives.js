const { StatusCodes } = require("http-status-codes");

const { disconnectFromDb } = require("../../database/connection");
const { getUrlTable } = require("../../models/url");
const { URLS_ERROR } = require("../../errors/errors");
const { connectToDb } = require("../urlServicesConnection");

let UrlTable;
try {
  UrlTable = getUrlTable(process.env.TABLE_NAME);
} catch (error) {
  console.error("Failed to create url table");
}

const addUrl = async (originalUrlToAdd, shortUrlToAdd) => {
  const connection = await connectToDb();
  const urls = await UrlTable.findOne({ where: { shortUrl: shortUrlToAdd } });
  if (!urls) {
    const newUrl = await UrlTable.create({
      originUrl: originalUrlToAdd,
      shortUrl: shortUrlToAdd,
    });
    disconnectFromDb(connection);
    return newUrl;
  }
  disconnectFromDb(connection);
  throw new URLS_ERROR("Short url already exists", StatusCodes.CONFLICT);
};

module.exports = { addUrl };
