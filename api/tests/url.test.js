const supertest = require("supertest");

const { UrlMocokTable } = require("../models/url");
const urlsData = require("./data/urlData");
const startServer = require("../../server");
const {
  createDbConnection,
  checkConnectionToDb,
  disconnectFromDb,
  createTableByModel,
} = require("../database/connection");

const app = startServer();

before(async () => {
  const connection = await createDbConnection();
  await checkConnectionToDb(connection);
  await createTableByModel(connection);
  await disconnectFromDb(connection);
});

after(async () => {
  await UrlMocokTable.destroy({
    where: {},
    truncate: true,
  });
});

describe("Get requests for urls", () => {
  it("Should return all urls", () => {
    supertest(app)
      .get("/urls/all")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(urlsData);
      });
  });

  it("Should return 404 status codes when there are no urls in db", () => {
    supertest(app)
      .get("/urls/all")
      .expect(404)
      .then((res) => {
        expect(res.body).toEqual([]);
      });
  });
});

describe("Post requests for urls", () => {
  it("Should post a new url to db", () => {
    supertest(app)
      .post("/add-url")
      .send({
        originUrl: "https://arunkumarvallal.medium.com",
        shortUrl: "lplp",
      })
      .expect(201);
  });
});
