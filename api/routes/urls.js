const router = require("express").Router();

const {
  getUrls,
  getUrlsStartingBy,
  getUrlsContaning,
  getUrlsNotContaining,
  postUrl,
  redirectUrl,
  patchUrl,
  deleteUrl,
} = require("../controllers/urlsController");

router.get("/all", getUrls);

router.get("/starting-by", getUrlsStartingBy);

router.get("/contains", getUrlsContaning);

router.get("/not-containing", getUrlsNotContaining);

router.get("/:shortUrl", redirectUrl);

router.post("/add-url", postUrl);

router.patch("/modify-url", patchUrl);

router.delete("/delete-url/:shortUrl", deleteUrl);

module.exports = router;
