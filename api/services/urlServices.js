const UrlTable = require("../models/url");

const getAllUrls = async () => {
  return await UrlTable.findAll();
};

const addUrl = async (originalUrlToAdd, shortUrlToAdd) => {
  const urls = await UrlTable.findOne({ where: { shortUrl: shortUrlToAdd } });
  if (!urls) {
    const newUrl = await UrlTable.create({
      originUrl: originalUrlToAdd,
      shortUrl: shortUrlToAdd,
    });
    return newUrl;
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
    return urlToModify;
  }
  return;
};

const deleteUrl = async (shortUrlToDelete) => {
  const urlToDelete = UrlTable.findOne({
    where: { shortUrl: shortUrlToDelete },
  });
  if (urlToDelete) {
    await UrlTable.destroy({ where: { shortUrl: shortUrlToDelete } });
    return urlToDelete;
  }
  return;
};

module.exports = {
  getAllUrls,
  addUrl,
  getUrlByShorterUrl,
  modifyUrl,
  deleteUrl,
};
