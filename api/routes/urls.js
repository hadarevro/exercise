const { StatusCodes } = require("http-status-codes");
const router = require("express").Router();

const { NO_URLS_FOUND_ERROR } = require("../errors/errors");
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
    if (urls) {
      return res.send(urls).status(StatusCodes.OK);
    } else {
      throw NO_URLS_FOUND_ERROR;
    }
  } catch (error) {
    console.error("Failed to get all urls", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

/////errors in catch, check if status code is 404, if it is return this status code,
//// if not, retrun 500
///// trnar instead of if

router.get("/starting-by", async (req, res) => {
  try {
    const { startingBy } = req.body;
    const urls = await getShortUrlsStartingBy(startingBy);
    if (urls) {
      return res.send(urls).status(StatusCodes.OK);
    } else {
      throw NO_URLS_FOUND_ERROR;
    }
  } catch (error) {
    console.error(`failed to get urls starting by ${startingBy}`, error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

router.get("/contains", async (req, res) => {
  try {
    const { contains } = req.body;
    const urls = await getShortUrlsContaining(contains);
    if (urls) {
      return res.send(urls).status(StatusCodes.OK);
    } else {
      throw NO_URLS_FOUND_ERROR;
    }
  } catch (error) {
    console.error(`failed to get urls contaning ${contains}`, error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

router.get("/not-containing", async (req, res) => {
  try {
    const { notContaining } = req.body;
    const urls = await getShortUrlsNotContaining(notContaining);
    if (urls) {
      return res.send(urls).status(StatusCodes.OK);
    } else {
      throw NO_URLS_FOUND_ERROR;
    }
  } catch (error) {
    console.error(`failed to get urls not containing ${notContaining} `, error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
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
  try {
    const { shortUrl } = req.params;
    const url = await getUrlByShorterUrl(shortUrl);
    if (url) {
      res.redirect(url.originUrl).status(StatusCodes.PERMANENT_REDIRECT);
    } else {
      throw NO_URLS_FOUND_ERROR;
    }
  } catch (error) {
    console.error("Failed to find wanted url", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

router.patch("/modify-url", async (req, res) => {
  try {
    const { originUrl, shortUrl, newOriginUrl } = req.body;
    const modifiedUrl = await modifyUrl(originUrl, shortUrl, newOriginUrl);
    if (modifiedUrl) {
      res
        .send(`Modified ${originUrl} to ${newOriginUrl} succesfully`)
        .status(StatusCodes.OK);
    } else {
      throw NO_URLS_FOUND_ERROR;
    }
  } catch (error) {
    console.error("Failed to to modify url", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

router.delete("/remove-url/:shortUrl", async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;
    const deletedUrl = await deleteUrl(shortUrl);
    if (deletedUrl) {
      res.send("Deleted url sucessfuly").status(StatusCodes.OK);
    } else {
      throw NO_URLS_FOUND_ERROR;
    }
  } catch (error) {
    console.error("Failed to delete url", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;
