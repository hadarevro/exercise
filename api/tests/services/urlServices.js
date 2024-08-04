const UrlMocokTable = require("../data/urlData");

// const addUrl = async (originalUrlToAdd, shortUrlToAdd) => {
//   return await Url.create({
//     originUrl: originalUrlToAdd,
//     shortUrl: shortUrlToAdd,
//   });
// };

const getAllUrls = async () => {
  return await UrlMocokTable.findAll();
};

module.exports = getAllUrls;
