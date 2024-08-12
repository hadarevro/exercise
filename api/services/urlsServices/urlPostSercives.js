const { StatusCodes } = require("http-status-codes");

const { disconnectFromDb } = require("../../database/connection");
const { URLS_ERROR } = require("../../errors/errors");
const { connectToDb, UrlTable } = require("../urlServicesConnection");

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
