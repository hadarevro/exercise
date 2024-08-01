const UrlTable = require("../models/url");

const getUrls = async () => {
  return await UrlTable.findAll();
};

const addUrl = async (originalUrlToAdd, shortUrlToAdd) => {
  const urls = await UrlTable.findOne({ where: { shortUrl: shortUrlToAdd } });
  if (!urls) {
    return await UrlTable.create({
      originUrl: originalUrlToAdd,
      shortUrl: shortUrlToAdd,
    });
  }
  return;
};

const getUrlByShorterUrl = async (shorterUrl) => {
  const originalUrl = await UrlTable.findOne({
    where: { shortUrl: shorterUrl },
  });
  return originalUrl;
};

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
    return true;
  }
  return false;
};

const deleteUrl = async (shortUrlToDelete) => {
  const urlToDelete = UrlTable.findOne({
    where: { shortUrl: shortUrlToDelete },
  });
  if (urlToDelete) {
    await UrlTable.destroy({ where: { shortUrl: shortUrlToDelete } });
    return true;
  }
  return false;
};

module.exports = {
  getUrls,
  addUrl,
  getUrlByShorterUrl,
  modifyUrl,
  deleteUrl,
};
