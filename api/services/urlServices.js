const { Op } = require("sequelize");

const {
  checkConnectionToDb,
  createDbConnection,
  disconnectFromDb,
} = require("../database/connection");
const { getUrlTable } = require("../models/url");

let UrlTable;
try {
  UrlTable = getUrlTable(process.env.TABLE_NAME);
} catch (error) {
  console.error("Failed to create url table");
}

const connectToDb = async () => {
  const connection = await createDbConnection();
  await checkConnectionToDb(connection);
  return connection;
};

const getAllUrls = async () => {
  const connection = await connectToDb();
  const urls = await UrlTable.findAll();
  disconnectFromDb(connection);
  return urls;
};

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
  return;
};

const getUrlByShorterUrl = async (shorterUrl) => {
  const connection = await connectToDb();
  const originalUrl = await UrlTable.findOne({
    where: { shortUrl: shorterUrl },
  });
  disconnectFromDb(connection);
  return originalUrl;
};

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
  return;
};

const deleteUrl = async (shortUrlToDelete) => {
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
  return;
};

const deleteAllUrls = async () => {
  const connection = await connectToDb();
  await UrlTable.destroy({
    where: {},
    truncate: true,
  });
  disconnectFromDb(connection);
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
  disconnectFromDb(connection);
  return urlsFound;
};

const getShortUrlsContaining = async (contains) => {
  const connection = await connectToDb();
  urlsFound = await UrlTable.findAll({
    where: { shortUrl: { [Op.substring]: contains } },
  });
  disconnectFromDb(connection);
  return urlsFound;
};

const getShortUrlsNotContaining = async (notContains) => {
  const connection = await connectToDb();
  urlsFound = await UrlTable.findAll({
    where: { shortUrl: { [Op.notLike]: `%${notContains}%` } },
  });
  disconnectFromDb(connection);
  return urlsFound;
};

module.exports = {
  getAllUrls,
  addUrl,
  getUrlByShorterUrl,
  modifyUrl,
  deleteUrl,
  deleteAllUrls,
  isDbContainsUrl,
  getShortUrlsStartingBy,
  getShortUrlsContaining,
  getShortUrlsNotContaining,
};
