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

const modifyUrl = async (
  originalUrlToModify,
  shortUrlToModify,
  newOriginUrl
) => {
  const connection = await connectToDb();
  const urlToModify = await UrlTable.findOne({
    where: { originUrl: originalUrlToModify, shortUrl: shortUrlToModify },
  });
  if (urlToModify) {
    urlToModify.originUrl = newOriginUrl;
    await urlToModify.save();
    disconnectFromDb(connection);
    return urlToModify;
  }
  disconnectFromDb(connection);
  throw new URLS_ERROR(
    "No urls matching your request found",
    StatusCodes.NOT_FOUND
  );
};

module.exports = {
  modifyUrl,
};
