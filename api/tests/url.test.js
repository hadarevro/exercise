const supertest = require("supertest");
const { StatusCodes } = require("http-status-codes");

const { urlToInsert } = require("./data/urlData");
const startServer = require("../../server");
const {
  createDbConnection,
  checkConnectionToDb,
  disconnectFromDb,
  createTableByModel,
} = require("../database/connection");
const {
  addUrl,
  deleteAllUrls,
  isDbContainsUrl,
} = require("../services/urlServices");

before(async () => {
  const connection = await createDbConnection();
  await checkConnectionToDb(connection);
  await createTableByModel(connection);
  await disconnectFromDb(connection);
});

const app = startServer();

beforeEach(async () => {
  await deleteAllUrls();
});

afterEach(async () => {
  await deleteAllUrls();
});

describe("Get requests for urls", () => {
  it("Should return all urls", () => {
    addUrl(urlToInsert.originUrl, urlToInsert.shortUrl);
    supertest(app)
      .get("/urls/all")
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body).toEqual(urlsData);
      });
  });

  it("Should return 404 status codes when there are no urls in db", () => {
    supertest(app)
      .get("/urls/all")
      .expect(StatusCodes.NOT_FOUND)
      .then((res) => {
        expect(res.body).toEqual([]);
      });
  });
});

describe("Post requests for urls", () => {
  it("Should post a new url to db", () => {
    supertest(app)
      .post("/add-url")
      .send(urlToInsert)
      .expect(StatusCodes.CREATED)
      .expect(isDbContainsUrl(urlToInsert))
      .then((res) => {
        expect(res.body.originUrl).toEqual(urlToInsert.originUrl);
        expect(res.body.shortUrl).toEqual(urlToInsert.shortUrl);
      });
  });

  it("Should not post a url to db if already exists", () => {
    addUrl(urlToInsert.originUrl, urlToInsert.shortUrl);
    supertest(app)
      .post("/add-url")
      .send({ urlToInsert })
      .expect(StatusCodes.CONFLICT);
  });
});

describe("Delete requests for urls", () => {
  it("Should delete a specified url from db", () => {
    addUrl(urlToInsert.originUrl, urlToInsert.shortUrl);
    supertest(app)
      .delete(`/remove-url/:${urlToInsert.shortUrl}`)
      .expect(StatusCodes.OK)
      .expect(!isDbContainsUrl(urlToInsert));
  });

  it("Should fail to delete unexisting url", () => {
    supertest(app)
      .delete(`/remove-url/:${urlToInsert.shortUrl}`)
      .expect(StatusCodes.NOT_FOUND);
  });
});
