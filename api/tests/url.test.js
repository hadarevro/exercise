const supertest = require("supertest");

const urlsData = require("./data/urlData");
const UrlMocokTable = require("./data/urlData");
const startServer = require("../../server");
const getAllUrls = require("./services/urlServices");
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
