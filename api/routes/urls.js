const { StatusCodes } = require("http-status-codes");
const router = require("express").Router();

const {
  NO_URLS_FOUND_ERROR,
  handleNoUrlsFound: handleNoUrlsFoundError,
} = require("../errors/errors");
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

router.get("/all", async (req, res) => {
  try {
    const urls = await getAllUrls();
    if (urls.length) {
      res.send(urls).status(StatusCodes.OK);
    } else {
      throw new NO_URLS_FOUND_ERROR("No urls found, try adding some");
    }
  } catch (error) {
    return handleNoUrlsFoundError(res, error);
  }
});

router.get("/starting-by", async (req, res) => {
  const { startingBy } = req.body;
  try {
    const urls = await getShortUrlsStartingBy(startingBy);
    if (urls.length) {
      return res.send(urls).status(StatusCodes.OK);
    } else {
      throw new NO_URLS_FOUND_ERROR(
        `failed to get urls starting by ${startingBy}`
      );
    }
  } catch (error) {
    return handleNoUrlsFoundError(res, error);
  }
});

router.get("/contains", async (req, res) => {
  const { contains } = req.body;
  try {
    const urls = await getShortUrlsContaining(contains);
    if (urls) {
      return res.send(urls).status(StatusCodes.OK);
    } else {
      throw new NO_URLS_FOUND_ERROR(`No urls contaning ${contains}`);
    }
  } catch (error) {
    return handleNoUrlsFoundError(res, error);
  }
});

router.get("/not-containing", async (req, res) => {
  const { notContaining } = req.body;
  try {
    const urls = await getShortUrlsNotContaining(notContaining);
    if (urls) {
      return res.send(urls).status(StatusCodes.OK);
    } else {
      throw new NO_URLS_FOUND_ERROR(`No urls not containing ${notContaining} `);
    }
  } catch (error) {
    return handleNoUrlsFoundError(res, error);
  }
});

router.post("/add-url", async (req, res) => {
  const { originUrl, shortUrl } = req.body;
  try {
    const newUrl = await addUrl(originUrl, shortUrl);
    if (newUrl) {
      return res
        .send(`Added ${originUrl} succesfully to db`)
        .status(StatusCodes.CREATED);
    }
    res.send("Short url already exists").status(StatusCodes.CONFLICT);
  } catch (error) {
    console.error("Failed to add new url to the db", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

router.get("/:shortUrl", async (req, res) => {
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
});

router.patch("/modify-url", async (req, res) => {
  const { originUrl, shortUrl, newOriginUrl } = req.body;
  try {
    const modifiedUrl = await modifyUrl(originUrl, shortUrl, newOriginUrl);
    if (modifiedUrl) {
      res
        .send(`Modified ${originUrl} to ${newOriginUrl} succesfully`)
        .status(StatusCodes.OK);
    } else {
      throw new NO_URLS_FOUND_ERROR("No urls matching your request found");
    }
  } catch (error) {
    return handleNoUrlsFoundError(res, error);
  }
});

router.delete("/remove-url/:shortUrl", async (req, res) => {
  const shortUrl = req.params.shortUrl;
  try {
    const deletedUrl = await deleteUrl(shortUrl);
    if (!deletedUrl) {
      res.send("Deleted url sucessfuly").status(StatusCodes.OK);
    } else {
      throw new NO_URLS_FOUND_ERROR("No urls matching your request found");
    }
  } catch (error) {
    return handleNoUrlsFoundError(res, error);
  }
});

module.exports = router;
