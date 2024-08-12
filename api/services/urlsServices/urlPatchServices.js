const { StatusCodes } = require("http-status-codes");

const { URLS_ERROR, NOT_FOUND_ERROR_MESSAGE } = require("../../errors/errors");
const { UrlTable } = require("../urlServicesConnection");

const modifyUrl = async (
  originalUrlToModify,
  shortUrlToModify,
  newOriginUrl
) => {
  const urlToModify = await UrlTable.findOne({
    where: { originUrl: originalUrlToModify, shortUrl: shortUrlToModify },
  });
  if (urlToModify) {
    urlToModify.originUrl = newOriginUrl;
    await urlToModify.save();
    return urlToModify;
  }
  throw new URLS_ERROR(NOT_FOUND_ERROR_MESSAGE, StatusCodes.NOT_FOUND);
};

module.exports = {
  modifyUrl,
};
