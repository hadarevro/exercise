const { StatusCodes } = require("http-status-codes");

const {
  getAllUrls,
  addUrl,
  getUrlByShorterUrl,
  modifyUrl,
  deleteUrl,
  getShortUrlsStartingBy,
  getShortUrlsContaining,
  getShortUrlsNotContaining,
} = require("../services/urlServices");
const {
  NO_URLS_FOUND_ERROR,
  handleNoUrlsFoundError,
} = require("../errors/errors");

const getUrls = async (_, res) => {
  try {
    const urls = await getAllUrls();
    if (urls.length) {
      return res.json(urls).status(StatusCodes.OK);
    } else {
      throw new NO_URLS_FOUND_ERROR("No urls found, try adding some");
    }
  } catch (error) {
    return handleNoUrlsFoundError(res, error);
  }
};

const getUrlsStartingBy = async (req, res) => {
  const { startingBy } = req.body;
  try {
    const urls = await getShortUrlsStartingBy(startingBy);
    if (urls.length) {
      return res.json(urls).status(StatusCodes.OK);
    } else {
      throw new NO_URLS_FOUND_ERROR(
        `failed to get urls starting by ${startingBy}`
      );
    }
  } catch (error) {
    return handleNoUrlsFoundError(res, error);
  }
};

const getUrlsContaning = async (req, res) => {
  const { contains } = req.body;
  try {
    const urls = await getShortUrlsContaining(contains);
    if (urls) {
      return res.json(urls).status(StatusCodes.OK);
    } else {
      throw new NO_URLS_FOUND_ERROR(`No urls contaning ${contains}`);
    }
  } catch (error) {
    return handleNoUrlsFoundError(res, error);
  }
};

const getUrlsNotContaining = async (req, res) => {
  const { notContaining } = req.body;
  try {
    const urls = await getShortUrlsNotContaining(notContaining);
    if (urls) {
      return res.json(urls).status(StatusCodes.OK);
    } else {
      throw new NO_URLS_FOUND_ERROR(`No urls not containing ${notContaining} `);
    }
  } catch (error) {
    return handleNoUrlsFoundError(res, error);
  }
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
  try {
    const url = await getUrlByShorterUrl(shortUrl);
    if (url) {
      res.redirect(url.originUrl).status(StatusCodes.PERMANENT_REDIRECT);
    } else {
      throw new NO_URLS_FOUND_ERROR(`The short url ${shortUrl} does not exist`);
    }
  } catch (error) {
    return handleNoUrlsFoundError(res, error);
  }
};

const patchUrl = async (req, res) => {
  const { originUrl, shortUrl, newOriginUrl } = req.body;
  try {
    const modifiedUrl = await modifyUrl(originUrl, shortUrl, newOriginUrl);
    if (modifiedUrl) {
      res
        .json(`Modified ${originUrl} to ${newOriginUrl} succesfully`)
        .status(StatusCodes.OK);
    } else {
      throw new NO_URLS_FOUND_ERROR("No urls matching your request found");
    }
  } catch (error) {
    return handleNoUrlsFoundError(res, error);
  }
};

const deleteUrll = async (req, res) => {
  const shortUrl = req.params.shortUrl;
  try {
    const deletedUrl = await deleteUrl(shortUrl);
    if (!deletedUrl) {
      res.json("Deleted url sucessfuly").status(StatusCodes.OK);
    } else {
      throw new NO_URLS_FOUND_ERROR("No urls matching your request found");
    }
  } catch (error) {
    return handleNoUrlsFoundError(res, error);
  }
};

module.exports = {
  getUrls,
  getUrlsStartingBy,
  getUrlsContaning,
  getUrlsNotContaining,
  postUrl,
  redirectUrl,
  patchUrl,
  deleteUrll,
};
