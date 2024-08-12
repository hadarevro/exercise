const { Op } = require("sequelize");
const { StatusCodes } = require("http-status-codes");

const { disconnectFromDb } = require("../../database/connection");
const { URLS_ERROR } = require("../../errors/errors");
const { connectToDb, UrlTable } = require("../urlServicesConnection");

const getAllUrls = async () => {
  const connection = await connectToDb();
  const urls = await UrlTable.findAll();
  if (urls.length) {
    return urls;
  }
  disconnectFromDb(connection);
  throw new URLS_ERROR(
    `Failed to get urls starting by ${startingBy}`,
    StatusCodes.NOT_FOUND
  );
};

const getUrlByShorterUrl = async (shorterUrl) => {
  const connection = await connectToDb();
  const originalUrl = await UrlTable.findOne({
    where: { shortUrl: shorterUrl },
  });
  disconnectFromDb(connection);
  if (originalUrl) {
    return originalUrl;
  }
  throw new URLS_ERROR(`The short url ${shorterUrl} does not exist`);
};

const isDbContainsUrl = async (url) => {
  const connection = await connectToDb();
  urlFound = await UrlTable.findOne(url);
  disconnectFromDb(connection);
  return !urlFound.length() ? true : false;
};

const getShortUrlsStartingBy = async (stringBy) => {
  const connection = await connectToDb();
  urlsFound = await UrlTable.findAll({
    where: { shortUrl: { [Op.startsWith]: stringBy } },
  });
  if (urlsFound.length) {
    return urlsFound;
  }
  disconnectFromDb(connection);
  throw new URLS_ERROR(
    `Failed to get urls starting by ${startingBy}`,
    StatusCodes.NOT_FOUND
  );
};

const getShortUrlsContaining = async (contains) => {
  const connection = await connectToDb();
  urlsFound = await UrlTable.findAll({
    where: { shortUrl: { [Op.substring]: contains } },
  });
  if (urlsFound.length) {
    return urlsFound;
  }
  disconnectFromDb(connection);
  throw new URLS_ERROR(`No urls contaning ${contains}`, StatusCodes.NOT_FOUND);
};

const getShortUrlsNotContaining = async (notContains) => {
  const connection = await connectToDb();
  urlsFound = await UrlTable.findAll({
    where: { shortUrl: { [Op.notLike]: `%${notContains}%` } },
  });
  if (urlsFound.length) {
    return urlsFound;
  }
  disconnectFromDb(connection);
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
