const { StatusCodes } = require("http-status-codes");

const { URLS_ERROR } = require("../../errors/errors");
const { UrlTable } = require("../urlServicesConnection");

const addUrl = async (originalUrlToAdd, shortUrlToAdd) => {
  const urls = await UrlTable.findOne({ where: { shortUrl: shortUrlToAdd } });
  if (!urls) {
    const newUrl = await UrlTable.create({
      originUrl: originalUrlToAdd,
      shortUrl: shortUrlToAdd,
    });
    return newUrl;
  }
  throw new URLS_ERROR("Short url already exists", StatusCodes.CONFLICT);
};

module.exports = { addUrl };
