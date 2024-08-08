const router = require("express").Router();

const {
  getUrls,
  getUrlsStartingBy,
  getUrlsContaning,
  getUrlsNotContaining,
  postUrl,
  redirectUrl,
  patchUrl,
  deleteUrll,
} = require("../controllers/urlsController");

router.get("/all", getUrls);

router.get("/starting-by", getUrlsStartingBy);

router.get("/contains", getUrlsContaning);

router.get("/not-containing", getUrlsNotContaining);

router.post("/add-url", postUrl);

router.get("/:shortUrl", redirectUrl);

router.patch("/modify-url", patchUrl);

router.delete("/remove-url/:shortUrl", deleteUrll);

module.exports = router;
