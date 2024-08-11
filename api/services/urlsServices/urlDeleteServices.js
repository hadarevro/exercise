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

const deleteUrlFromDb = async (shortUrlToDelete) => {
  const connection = await connectToDb();
  const urlToDelete = UrlTable.findOne({
    where: { shortUrl: shortUrlToDelete },
  });
  if (urlToDelete) {
    await UrlTable.destroy({ where: { shortUrl: shortUrlToDelete } });
    disconnectFromDb(connection);
    return urlToDelete;
  }
  disconnectFromDb(connection);
  throw new URLS_ERROR(
    "No urls matching your request found",
    StatusCodes.NOT_FOUND
  );
};

const deleteAllUrls = async () => {
  const connection = await connectToDb();
  await UrlTable.destroy({
    where: {},
    truncate: true,
  });
  disconnectFromDb(connection);
};

module.exports = { deleteAllUrls, deleteUrlFromDb };
