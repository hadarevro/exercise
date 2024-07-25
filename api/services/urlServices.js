const postgreClient = require("../database/connection");
const Url = require("../models/url");

const getUrls = () => {
  return Url.findAll();
};

const addUrl = (originalUrlToAdd, shortUrlToAdd) => {
  const urlsWithShortId = Url.find({ where: { shorterUrl } });
  if (!urlsWithShortId) {
    return Url.create({
      originUrl: originalUrlToAdd,
      shortUrl: shortUrlToAdd,
    });
  }
  //throw Error
};

const getUrlByShorterUrl = (shorterUrl) => {
  const originalUrl = Url.findOne({ where: { shortUrl: shorterUrl } });
  return originalUrl.originUrl;
};

const modifyUrl = (originalUrlToModify, shortUrlToModify) => {
  const urlToModify = Url.find({
    where: { originUrl: originalUrlToModify, shortUrl: shortUrlToModify },
  });
  urlToModify.originUrl;
  postgreClient.query("UPDATE urls SET shortUrl = $1 WHERE originUrl $2", [
    originalUrl,
    shortUrl,
  ]);
};

const deleteUrl = (urlToDelete) => {
  Url.destroy({ where: { urlId: urlToDelete } });
};

module.exports = {
  getUrls,
  addUrl,
  getUrlByShorterUrl,
  modifyUrl,
  deleteUrl,
};
