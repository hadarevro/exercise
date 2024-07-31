const Url = require("../models/url");

const getUrls = async () => {
  return await Url.findAll();
};

const addUrl = async (originalUrlToAdd, shortUrlToAdd) => {
  const urls = await Url.findOne({ where: { shortUrl: shortUrlToAdd } });
  if (!urls) {
    return await Url.create({
      originUrl: originalUrlToAdd,
      shortUrl: shortUrlToAdd,
    });
  }
  return;
};

const getUrlByShorterUrl = async (shorterUrl) => {
  const originalUrl = await Url.findOne({ where: { shortUrl: shorterUrl } });
  return originalUrl;
};

const modifyUrl = async (
  originalUrlToModify,
  shortUrlToModify,
  newOriginUrl
) => {
  const urlToModify = await Url.findOne({
    where: { originUrl: originalUrlToModify, shortUrl: shortUrlToModify },
  });
  if (urlToModify) {
    urlToModify.originUrl = newOriginUrl;
    await urlToModify.save();
    return true;
  }
  return false;
};

const deleteUrl = async (urlToDelete) => {
  await Url.destroy({ where: { shortUrl: urlToDelete } });
};

module.exports = {
  getUrls,
  addUrl,
  getUrlByShorterUrl,
  modifyUrl,
  deleteUrl,
};
