const supertest = require("supertest");
const { StatusCodes } = require("http-status-codes");

const { mockUrlData, modifiedUrl, randomUrl } = require("./data/urlData");
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
    addUrl(mockUrlData.originUrl, mockUrlData.shortUrl);
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
      .send(mockUrlData)
      .expect(StatusCodes.CREATED)
      .expect(isDbContainsUrl(mockUrlData))
      .then((res) => {
        expect(res.body.originUrl).toEqual(mockUrlData.originUrl);
        expect(res.body.shortUrl).toEqual(mockUrlData.shortUrl);
      });
  });

  it("Should not post a url to db if already exists", () => {
    addUrl(mockUrlData.originUrl, mockUrlData.shortUrl);
    supertest(app)
      .post("/add-url")
      .send({ mockUrlData })
      .expect(StatusCodes.CONFLICT);
  });
});

describe("Delete requests for urls", () => {
  it("Should delete a specified url from db", () => {
    addUrl(mockUrlData.originUrl, mockUrlData.shortUrl);
    supertest(app)
      .delete(`/remove-url/:${mockUrlData.shortUrl}`)
      .expect(StatusCodes.OK)
      .expect(!isDbContainsUrl(mockUrlData));
  });

  it("Should fail to delete unexisting url", () => {
    supertest(app)
      .delete(`/remove-url/:${mockUrlData.shortUrl}`)
      .expect(StatusCodes.NOT_FOUND);
  });
});

describe("Patch requests for urls", () => {
  it("Should modify an existing url", () => {
    addUrl(mockUrlData.originUrl, mockUrlData.shortUrl);
    supertest(app)
      .patch("/modify-url")
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body.originUrl).toEqual(modifiedUrl.originUrl);
        expect(res.body.shortUrl).toEqual(modifiedUrl.shortUrl);
      });
  });

  it("Should fail to modify unexisting url", () => {
    supertest(app).patch("/modify-url").expect(StatusCodes.NOT_FOUND);
  });
});

describe("Get requests for urls redirection", () => {
  it("Should redirect short url to its Origin url", () => {
    supertest(app)
      .get(`/:${mockUrlData.shortUrl}`)
      .redirects(1)
      .expect("Location", `${mockUrlData.originUrl}`)
      .expect(StatusCodes.MOVED_PERMANENTLY);
  });

  it("Should fail to redirect to an unexisting url", () => {
    supertest(app)
      .get(`/:${randomUrl}`)
      .redirects(0)
      .expect(StatusCodes.NOT_FOUND);
  });
});
