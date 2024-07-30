const Url = require("../data/urlData");

const addUrl = async (originalUrlToAdd, shortUrlToAdd) => {
  return await Url.create({
    originUrl: originalUrlToAdd,
    shortUrl: shortUrlToAdd,
  });
};

module.exports = addUrl;
