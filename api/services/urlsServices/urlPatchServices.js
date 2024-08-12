const { StatusCodes } = require("http-status-codes");

const { disconnectFromDb } = require("../../database/connection");
const { URLS_ERROR } = require("../../errors/errors");
const { connectToDb, UrlTable } = require("../urlServicesConnection");

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
