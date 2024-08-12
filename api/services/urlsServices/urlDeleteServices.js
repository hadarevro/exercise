const { StatusCodes } = require("http-status-codes");

const { URLS_ERROR, NOT_FOUND_ERROR_MESSAGE } = require("../../errors/errors");
const { UrlTable } = require("../urlServicesConnection");

const deleteUrlFromDb = async (shortUrlToDelete) => {
  const urlToDelete = UrlTable.findOne({
    where: { shortUrl: shortUrlToDelete },
  });
  if (urlToDelete) {
    await UrlTable.destroy({ where: { shortUrl: shortUrlToDelete } });
    return urlToDelete;
  }
  throw new URLS_ERROR(NOT_FOUND_ERROR_MESSAGE, StatusCodes.NOT_FOUND);
};

const deleteAllUrls = async () => {
  await UrlTable.destroy({
    where: {},
    truncate: true,
  });
};

module.exports = { deleteAllUrls, deleteUrlFromDb };
