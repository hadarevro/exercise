const router = require("express").Router();

const { StatusCodes } = require("http-status-codes");
const {
  getAllUrls,
  addUrl,
  getUrlByShorterUrl,
  modifyUrl,
  deleteUrl,
} = require("../services/urlServices");

router.get("/all", async (req, res) => {
  try {
    const urls = await getAllUrls();
    if (urls) {
      return res.send(urls).status(StatusCodes.OK);
    }
    res.send("No urls found, try adding some").status(StatusCodes.NOT_FOUND);
  } catch (error) {
    console.error("Failed to get all urls", error);
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
      console.log(url.originUrl);
      res.redirect(url.originUrl).status(StatusCodes.OK);
    }
    res
      .send("Couldn't find urls matching your request")
      .status(StatusCodes.NOT_FOUND);
  } catch (error) {
    console.error("Failed to find wanted url ", error);
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
    }
    res
      .send("Can't find original url or the shortned one")
      .status(StatusCodes.NOT_FOUND);
  } catch (error) {
    console.error("Failed to to modify url", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

router.delete("/remove-url", async (req, res) => {
  try {
    const shortUrl = req.body.shortUrl;
    const deletedUrl = await deleteUrl(shortUrl);
    if (deletedUrl) {
      res.send("Deleted url sucessfuly").status(StatusCodes.OK);
    }
    res.send("Url does not exist").status(StatusCodes.NOT_FOUND);
  } catch (error) {
    console.error("Failed to delete url ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;
