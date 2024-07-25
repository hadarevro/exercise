const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");

const getUrls = require("../services/urlServices");
// const postgreClient = require("../database/connection");
// const Url = require("../schemas/url");
const swaggerDocument = require("./swagger.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.get("/", async (req, res) => {
  try {
    const urls = getUrls();
    res.json(urls.json()).status(200);
  } catch (error) {
    console.error("failed to get all urls ", error);
    res.send(500);
  }
});
