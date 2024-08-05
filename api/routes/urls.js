const { StatusCodes } = require("http-status-codes");
const router = require("express").Router();

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
  checkConnectionToDb,
  createDbConnection,
  disconnectFromDb,
} = require("../database/connection");

router.get("/all", async (req, res) => {
  const connection = createDbConnection();
  try {
    await checkConnectionToDb(connection);
    const urls = await getAllUrls();
    if (urls) {
      return res.send(urls).status(StatusCodes.OK);
    }
    res.send("No urls found, try adding some").status(StatusCodes.NOT_FOUND);
  } catch (error) {
    console.error("Failed to get all urls", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  } finally {
    disconnectFromDb(connection);
  }
});

router.get("/starting-by", async (req, res) => {
  const connection = createDbConnection();
  const { startingBy } = req.body;
  try {
    await checkConnectionToDb(connection);
    const urls = await getShortUrlsStartingBy(startingBy);
    console.log(urls[0]);
    if (urls) {
      return res.send(urls).status(StatusCodes.OK);
    }
    res
      .send(`No urls found starting by ${startingBy} found`)
      .status(StatusCodes.NOT_FOUND);
  } catch (error) {
    console.error(`failed to get urls starting by ${startingBy}`, error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  } finally {
    disconnectFromDb(connection);
  }
});

router.get("/contains", async (req, res) => {
  const connection = createDbConnection();
  const { contains } = req.body;
  try {
    await checkConnectionToDb(connection);
    const urls = await getShortUrlsContaining(contains);
    if (urls) {
      return res.send(urls).status(StatusCodes.OK);
    }
    res
      .send(`No urls containing ${contains} found`)
      .status(StatusCodes.NOT_FOUND);
  } catch (error) {
    console.error(`failed to get urls contaning ${contains}`, error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  } finally {
    disconnectFromDb(connection);
  }
});

router.get("/not-containing", async (req, res) => {
  const connection = createDbConnection();
  const { notContaining } = req.body;
  try {
    await checkConnectionToDb(connection);
    const urls = await getShortUrlsNotContaining(notContaining);
    if (urls) {
      return res.send(urls).status(StatusCodes.OK);
    }
    res
      .send(`No urls not containing ${notContaining} found`)
      .status(StatusCodes.NOT_FOUND);
  } catch (error) {
    console.error(`failed to get urls not containing ${notContaining} `, error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  } finally {
    disconnectFromDb(connection);
  }
});

router.post("/add-url", async (req, res) => {
  const { originUrl, shortUrl } = req.body;
  const connection = createDbConnection();
  try {
    await checkConnectionToDb(connection);
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
  } finally {
    disconnectFromDb(connection);
  }
});

router.get("/:shortUrl", async (req, res) => {
  const connection = createDbConnection();
  try {
    await checkConnectionToDb(connection);
    const { shortUrl } = req.params;
    const url = await getUrlByShorterUrl(shortUrl);
    if (url) {
      console.log(url.originUrl);
      res.redirect(url.originUrl).status(StatusCodes.PERMANENT_REDIRECT);
    }
    res
      .send("Couldn't find urls matching your request")
      .status(StatusCodes.NOT_FOUND);
  } catch (error) {
    console.error("Failed to find wanted url", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  } finally {
    disconnectFromDb(connection);
  }
});

router.patch("/modify-url", async (req, res) => {
  const connection = createDbConnection();
  try {
    await checkConnectionToDb(connection);
    const { originUrl, shortUrl, newOriginUrl } = req.body;
    const modifiedUrl = await modifyUrl(originUrl, shortUrl, newOriginUrl);
    if (modifiedUrl) {
      res
        .send(`Modified ${originUrl} to ${newOriginUrl} succesfully`)
        .status(StatusCodes.OK);
    }
    res
      .send("Can't find original url or the shortned one")
      .status(StatusCodes.NOT_FOUND);
  } catch (error) {
    console.error("Failed to to modify url", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  } finally {
    disconnectFromDb(connection);
  }
});

router.delete("/remove-url/:shortUrl", async (req, res) => {
  const connection = createDbConnection();
  try {
    await checkConnectionToDb(connection);
    const shortUrl = req.params.shortUrl;
    const deletedUrl = await deleteUrl(shortUrl);
    if (deletedUrl) {
      res.send("Deleted url sucessfuly").status(StatusCodes.OK);
    }
    res.send("Url does not exist").status(StatusCodes.NOT_FOUND);
  } catch (error) {
    console.error("Failed to delete url", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  } finally {
    disconnectFromDb(connection);
  }
});

module.exports = router;
