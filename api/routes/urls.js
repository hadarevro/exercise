const router = require("express").Router();

const {
  getUrls,
  addUrl,
  getUrlByShorterUrl,
  modifyUrl,
  deleteUrl,
} = require("../services/urlServices");

router.get("/", async (req, res) => {
  try {
    const urls = await getUrls();
    if (urls) {
      return res.send(urls).status(200);
    }
    res.send("No urls found, try adding some").status(404);
  } catch (error) {
    console.error("Failed to get all urls", error);
    res.status(500);
  }
});

router.post("/", async (req, res) => {
  const { originUrl, shortUrl } = req.body;
  console.log(originUrl);
  try {
    await addUrl(originUrl, shortUrl);
    res.send(`Added ${originUrl} succesfully to db`).status(201);
  } catch (error) {
    console.error("Failed to add new url to the db", error);
    res.status(500);
  }
});

router.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await getUrlByShorterUrl(shortUrl);
    if (url) {
      console.log(url.originUrl);
      res.redirect(url.originUrl).status(200);
    }
    res.send("Couldn't find urls matching your request").status(404);
  } catch (error) {
    console.error("Failed to find wanted url ", error);
    res.status(500);
  }
});

router.patch("/", async (req, res) => {
  try {
    const { originUrl, shortUrl, newShortUrl } = req.body;
    await modifyUrl(originUrl, shortUrl, newShortUrl);
    res.send(`Modified ${originUrl} succesfully`).status(200);
  } catch (error) {
    console.error("Failed to to modify url", error);
    res.status(500);
  }
});

router.delete("/", async (req, res) => {
  try {
    const shortUrl = req.body.shortUrl;
    await deleteUrl(shortUrl);
    res.send("Deleted url sucessfuly");
  } catch (error) {
    console.error("Failed to delete url ", error);
    res.status(500);
  }
});

module.exports = router;
