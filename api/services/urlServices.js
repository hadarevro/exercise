const Url = require("../models/url");

const getUrls = async () => {
  return await Url.findAll();
};

const addUrl = async (originalUrlToAdd, shortUrlToAdd) => {
  return await Url.create({
    originUrl: originalUrlToAdd,
    shortUrl: shortUrlToAdd,
  });
};

const getUrlByShorterUrl = async (shorterUrl) => {
  const originalUrl = await Url.findOne({ where: { shortUrl: shorterUrl } });
  return originalUrl;
};

const modifyUrl = async (
  originalUrlToModify,
  shortUrlToModify,
  newShortUrl
) => {
  console.log(originalUrlToModify, shortUrlToModify, newShortUrl);
  const urlToModify = await Url.findOne({
    where: { originUrl: originalUrlToModify, shortUrl: shortUrlToModify },
  });
  urlToModify.shortUrl = newShortUrl;
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
