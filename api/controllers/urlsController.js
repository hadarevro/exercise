const { StatusCodes } = require("http-status-codes");

const urlDeleteServices = require("../services/urlsServices/urlDeleteServices");
const urlGetServices = require("../services/urlsServices/urlGetServices");
const urlPatchServices = require("../services/urlsServices/urlPatchServices");
const urlPostServices = require("../services/urlsServices/urlPostSercives");

const getUrls = async (_, res) => {
  const urls = await urlGetServices.getAllUrls();
  return res.json(urls).status(StatusCodes.OK);
};

const getUrlsStartingBy = async (req, res) => {
  const { startingBy } = req.body;
  const urls = await urlGetServices.getShortUrlsStartingBy(startingBy);
  return res.json(urls).status(StatusCodes.OK);
};

const getUrlsContaning = async (req, res) => {
  const { contains } = req.body;
  const urls = await urlGetServices.getShortUrlsContaining(contains);
  return res.json(urls).status(StatusCodes.OK);
};

const getUrlsNotContaining = async (req, res) => {
  const { notContaining } = req.body;
  const urls = await urlGetServices.getShortUrlsNotContaining(notContaining);
  return res.json(urls).status(StatusCodes.OK);
};

const postUrl = async (req, res) => {
  const { originUrl, shortUrl } = req.body;
  const newUrl = await urlPostServices.addUrl(originUrl, shortUrl);
  return res
    .json(`Added ${newUrl.originUrl} succesfully to db`)
    .status(StatusCodes.CREATED);
};

const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;
  const url = await urlGetServices.getUrlByShorterUrl(shortUrl);
  return res.redirect(url.originUrl).status(StatusCodes.PERMANENT_REDIRECT);
};

const patchUrl = async (req, res) => {
  const { originUrl, shortUrl, newOriginUrl } = req.body;
  const modifiedUrl = await urlPatchServices.modifyUrl(
    originUrl,
    shortUrl,
    newOriginUrl
  );
  return res
    .json(`Modified ${originUrl} to ${modifiedUrl.originUrl} succesfully`)
    .status(StatusCodes.OK);
};

const deleteUrl = async (req, res) => {
  const shortUrl = req.params.shortUrl;
  const deletedUrl = await urlDeleteServices.deleteUrlFromDb(shortUrl);
  res.json(`Deleted ${deletedUrl.shortUrl} sucessfuly`).status(StatusCodes.OK);
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
