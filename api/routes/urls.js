const { nanoid } = require("nanoid");
const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");

const Url = require("../schemas/url");
const swaggerDocument = require("./swagger.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));
