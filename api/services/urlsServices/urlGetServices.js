const { Op } = require("sequelize");
const { StatusCodes } = require("http-status-codes");

const { URLS_ERROR } = require("../../errors/errors");
const {  UrlTable } = require("../urlServicesConnection");

const getAllUrls = async () => {
  const urls = await UrlTable.findAll();
  if (urls.length) {
    return urls;
  }
  throw new URLS_ERROR(
    `Failed to get urls starting by ${startingBy}`,
    StatusCodes.NOT_FOUND
  );
};

const getUrlByShorterUrl = async (shorterUrl) => {
  const originalUrl = await UrlTable.findOne({
    where: { shortUrl: shorterUrl },
  });
  if (originalUrl) {
    return originalUrl;
  }
  throw new URLS_ERROR(`The short url ${shorterUrl} does not exist`);
};

const isDbContainsUrl = async (url) => {
  urlFound = await UrlTable.findOne(url);
  return !urlFound.length() ? true : false;
};

const getShortUrlsStartingBy = async (stringBy) => {
  urlsFound = await UrlTable.findAll({
    where: { shortUrl: { [Op.startsWith]: stringBy } },
  });
  if (urlsFound.length) {
    return urlsFound;
  }
  throw new URLS_ERROR(
    `Failed to get urls starting by ${startingBy}`,
    StatusCodes.NOT_FOUND
  );
};

const getShortUrlsContaining = async (contains) => {
  urlsFound = await UrlTable.findAll({
    where: { shortUrl: { [Op.substring]: contains } },
  });
  if (urlsFound.length) {
    return urlsFound;
  }
  throw new URLS_ERROR(`No urls contaning ${contains}`, StatusCodes.NOT_FOUND);
};

const getShortUrlsNotContaining = async (notContains) => {
  urlsFound = await UrlTable.findAll({
    where: { shortUrl: { [Op.notLike]: `%${notContains}%` } },
  });
  if (urlsFound.length) {
    return urlsFound;
  }
  throw new URLS_ERROR(
    `No urls not containing ${notContaining}`,
    StatusCodes.NOT_FOUND
  );
};

module.exports = {
  isDbContainsUrl,
  getAllUrls,
  getUrlByShorterUrl,
  getShortUrlsStartingBy,
  getShortUrlsContaining,
  getShortUrlsNotContaining,
};
