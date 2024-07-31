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
  try {
    if (await addUrl(originUrl, shortUrl)) {
      return res.send(`Added ${originUrl} succesfully to db`).status(201);
    }
    res.send("Short url already exists").status(409);
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
    const { originUrl, shortUrl, newOriginUrl } = req.body;
    if (await modifyUrl(originUrl, shortUrl, newOriginUrl)) {
      res
        .send(`Modified ${originUrl} to ${newOriginUrl} succesfully`)
        .status(200);
    }
    res.send("Can't find original url or the shorter one").status(404);
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
