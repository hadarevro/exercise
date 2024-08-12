const router = require("express").Router();

const { tryCatch } = require("../middlewares/urlsMiddlewares");
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

router.get("/all", tryCatch(getUrls));

router.get("/starting-by", tryCatch(getUrlsStartingBy));

router.get("/contains", tryCatch(getUrlsContaning));

router.get("/not-containing", tryCatch(getUrlsNotContaining));

router.get("/:shortUrl", tryCatch(redirectUrl));

router.post("/add-url", tryCatch(postUrl));

router.patch("/modify-url", tryCatch(patchUrl));

router.delete("/delete-url/:shortUrl", tryCatch(deleteUrl));

module.exports = router;
