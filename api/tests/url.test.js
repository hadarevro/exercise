const supertest = require("supertest");
const { StatusCodes } = require("http-status-codes");

const { mockUrl, secondMockUrl, randomUrl } = require("./data/urlDataConst");
const { startServer } = require("../../server");
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
const config = require("../../config/config");

const app = startServer();

before(async () => {
  const connection = await createDbConnection(
    config.db.databaseName,
    config.db.userName,
    config.db.databasePassword,
    config.db.host,
    config.db.dialect || "postgres"
  );
  await checkConnectionToDb(connection);
  await createTableByModel(connection);
  await disconnectFromDb(connection);
});

afterEach(async () => {
  await deleteAllUrls();
});

describe("Get requests for urls", () => {
  it("Should return all urls", () => {
    addUrl(mockUrl.originUrl, mockUrl.shortUrl);
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

  describe("Get requests for starting by", () => {
    it("Should return all urls starting by", () => {
      addUrl(mockUrl.originUrl, mockUrl.shortUrl);
      addUrl(secondMockUrl.originUrl, secondMockUrl.shortUrl);
      supertest(app)
        .get("urls/starting-by")
        .send({ startingBy: "short" })
        .expect(StatusCodes.OK)
        .then((res) => {
          expect(res.body.originUrl).toEqual(mockUrl.originUrl);
          expect(res.body.shortUrl).toEqual(mockUrl.shortUrl);
        });
    });

    it("Should return 404 status codes when there are no urls in db starting by", () => {
      addUrl(mockUrl.originUrl, mockUrl.shortUrl);
      addUrl(secondMockUrl.originUrl, secondMockUrl.shortUrl);
      supertest(app)
        .get("urls/starting-by")
        .send({ startingBy: "asdfg" })
        .expect(StatusCodes.NOT_FOUND)
        .then((res) => {
          expect(res.body.originUrl).toEqual(mockUrl.originUrl);
          expect(res.body.shortUrl).toEqual(mockUrl.shortUrl);
        });
    });
  });

  describe("Get requests for contaning", () => {
    it("Should return all urls containig a given pattern", () => {
      addUrl(mockUrl.originUrl, mockUrl.shortUrl);
      addUrl(secondMockUrl.originUrl, secondMockUrl.shortUrl);
      supertest(app)
        .get("urls/contains")
        .send({ contains: "For" })
        .expect(StatusCodes.OK)
        .then((res) => {
          expect(res.body.originUrl).toEqual(mockUrl.originUrl);
          expect(res.body.shortUrl).toEqual(mockUrl.shortUrl);
        });
    });

    it("Should return 404 code when no urls in db containig a given pattern", () => {
      addUrl(mockUrl.originUrl, mockUrl.shortUrl);
      addUrl(secondMockUrl.originUrl, secondMockUrl.shortUrl);
      supertest(app)
        .get("urls/contains")
        .send({ contains: "asdfghj" })
        .expect(StatusCodes.NOT_FOUND);
    });
  });

  describe("Get requests for not contaning", () => {
    it("Should return all urls not containig a given pattern", () => {
      addUrl(mockUrl.originUrl, mockUrl.shortUrl);
      addUrl(secondMockUrl.originUrl, secondMockUrl.shortUrl);
      supertest(app)
        .get("urls/contains")
        .send({ notContaining: "For" })
        .expect(StatusCodes.OK)
        .then((res) => {
          expect(res.body.originUrl).toEqual(secondMockUrl.originUrl);
          expect(res.body.shortUrl).toEqual(secondMockUrl.shortUrl);
        });
    });

    it("Should return 404 code when no urls in db not containig a given pattern", () => {
      addUrl(mockUrl.originUrl, mockUrl.shortUrl);
      addUrl(secondMockUrl.originUrl, secondMockUrl.shortUrl);
      supertest(app)
        .get("urls/contains")
        .send({ notContaining: "Url" })
        .expect(StatusCodes.NOT_FOUND);
    });
  });
});

describe("Post requests for urls", () => {
  it("Should post a new url to db", () => {
    supertest(app)
      .post("/add-url")
      .send(mockUrl)
      .expect(StatusCodes.CREATED)
      .expect(isDbContainsUrl(mockUrl))
      .then((res) => {
        expect(res.body.originUrl).toEqual(mockUrl.originUrl);
        expect(res.body.shortUrl).toEqual(mockUrl.shortUrl);
      });
  });

  it("Should not post a url to db if already exists", () => {
    addUrl(mockUrl.originUrl, mockUrl.shortUrl);
    supertest(app)
      .post("/add-url")
      .send({ mockUrl })
      .expect(StatusCodes.CONFLICT);
  });
});

describe("Delete requests for urls", () => {
  it("Should delete a specified url from db", () => {
    addUrl(mockUrl.originUrl, mockUrl.shortUrl);
    supertest(app)
      .delete(`/remove-url/:${mockUrl.shortUrl}`)
      .expect(StatusCodes.OK)
      .expect(!isDbContainsUrl(mockUrl));
  });

  it("Should fail to delete unexisting url", () => {
    supertest(app)
      .delete(`/remove-url/:${mockUrl.shortUrl}`)
      .expect(StatusCodes.NOT_FOUND);
  });
});

describe("Patch requests for urls", () => {
  it("Should modify an existing url", () => {
    addUrl(mockUrl.originUrl, mockUrl.shortUrl);
    supertest(app)
      .patch("/modify-url")
      .expect(StatusCodes.OK)
      .then((res) => {
        expect(res.body.originUrl).toEqual(secondMockUrl.originUrl);
        expect(res.body.shortUrl).toEqual(secondMockUrl.shortUrl);
      });
  });

  it("Should fail to modify unexisting url", () => {
    supertest(app).patch("/modify-url").expect(StatusCodes.NOT_FOUND);
  });
});

describe("Get requests for urls redirection", () => {
  it("Should redirect short url to its Origin url", () => {
    supertest(app)
      .get(`/:${mockUrl.shortUrl}`)
      .redirects(1)
      .expect("Location", `${mockUrl.originUrl}`)
      .expect(StatusCodes.MOVED_PERMANENTLY);
  });

  it("Should fail to redirect to an unexisting url", () => {
    supertest(app)
      .get(`/:${randomUrl}`)
      .redirects(0)
      .expect(StatusCodes.NOT_FOUND);
  });
});
