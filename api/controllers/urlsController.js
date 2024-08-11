const { StatusCodes } = require("http-status-codes");

const {
  getAllUrls,
  addUrl,
  getUrlByShorterUrl,
  modifyUrl,
  deleteUrlFromDb,
  getShortUrlsStartingBy,
  getShortUrlsContaining,
  getShortUrlsNotContaining,
} = require("../services/urlServices");
const { NO_URLS_FOUND_ERROR } = require("../errors/errors");

const getUrls = async (_, res) => {
  const urls = await getAllUrls();
  if (urls.length) {
    return res.json(urls).status(StatusCodes.OK);
  }
  throw new NO_URLS_FOUND_ERROR("No urls found, try adding some");
};

const getUrlsStartingBy = async (req, res) => {
  const { startingBy } = req.body;
  const urls = await getShortUrlsStartingBy(startingBy);
  if (urls.length) {
    return res.json(urls).status(StatusCodes.OK);
  }
  throw new NO_URLS_FOUND_ERROR(`Failed to get urls starting by ${startingBy}`);
};

const getUrlsContaning = async (req, res, next) => {
  const { contains } = req.body;
  const urls = await getShortUrlsContaining(contains);
  if (urls.length) {
    return res.json(urls).status(StatusCodes.OK);
  }
  throw new NO_URLS_FOUND_ERROR(`No urls contaning ${contains}`);
};

const getUrlsNotContaining = async (req, res) => {
  const { notContaining } = req.body;
  const urls = await getShortUrlsNotContaining(notContaining);
  if (urls) {
    return res.json(urls).status(StatusCodes.OK);
  }
  throw new NO_URLS_FOUND_ERROR(`No urls not containing ${notContaining} `);
};

const postUrl = async (req, res) => {
  const { originUrl, shortUrl } = req.body;
  try {
    const newUrl = await addUrl(originUrl, shortUrl);
    if (newUrl) {
      return res
        .json(`Added ${originUrl} succesfully to db`)
        .status(StatusCodes.CREATED);
    }
    res.send("Short url already exists").status(StatusCodes.CONFLICT);
  } catch (error) {
    console.error("Failed to add new url to the db", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;
  const url = await getUrlByShorterUrl(shortUrl);
  if (url) {
    return res.redirect(url.originUrl).status(StatusCodes.PERMANENT_REDIRECT);
  }
  throw new NO_URLS_FOUND_ERROR(`The short url ${shortUrl} does not exist`);
};

const patchUrl = async (req, res) => {
  const { originUrl, shortUrl, newOriginUrl } = req.body;
  const modifiedUrl = await modifyUrl(originUrl, shortUrl, newOriginUrl);
  if (modifiedUrl) {
    return res
      .json(`Modified ${originUrl} to ${newOriginUrl} succesfully`)
      .status(StatusCodes.OK);
  }
  throw new NO_URLS_FOUND_ERROR("No urls matching your request found");
};

const deleteUrl = async (req, res) => {
  const shortUrl = req.params.shortUrl;
  const deletedUrl = await deleteUrlFromDb(shortUrl);
  if (!deletedUrl) {
    res.json("Deleted url sucessfuly").status(StatusCodes.OK);
  }
  throw new NO_URLS_FOUND_ERROR("No urls matching your request found");
};

module.exports = {
  getUrls,
  getUrlsStartingBy,
  getUrlsContaning,
  getUrlsNotContaining,
  postUrl,
  redirectUrl,
  patchUrl,
  deleteUrl,
};
