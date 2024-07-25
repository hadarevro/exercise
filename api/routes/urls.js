const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");

const {
  getUrls,
  addUrl,
  getShortUrlByOriginal,
} = require("../services/urlServices");
const swaggerDocument = require("./swagger.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.get("/all", async (req, res) => {
  try {
    const urls = getUrls();
    if (!urls) {
      res.json(urls.json()).status(200);
    }
    res.send("No urls found, try adding some").status(404);
  } catch (error) {
    console.error("Failed to get all urls ", error);
    res.status(500);
  }
});

router.post("/", async (req, res) => {
  const { originalUrl, shortUrl } = req.body;
  try {
    addUrl(originalUrl, shortUrl);
    res.send(`Added ${originalUrl} succesfully to db`).status(201);
  } catch (error) {
    console.error("Failed to add new url to the db", error);
    res.status(500);
  }
});

router.get("/", async (req, res) => {
  try {
    const url = getShortUrlByOriginal(req.body);
    if (!url) {
      res.json(urls.json()).status(200);
    }
    res.send("Couldn't find urls matching your request").status(404);
  } catch (error) {
    console.error("Failed to find wanted url", error);
    res.status(500);
  }
});
