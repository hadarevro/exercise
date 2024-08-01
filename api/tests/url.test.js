const chai = require("chai");
const chaiHttp = require("chai-http");

const Url = require("./data/urlData");
const startServer = require("../../server");
const addUrl = require("./services/urlServices");

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();

before((done) => {
  Url.destroy({
    where: {},
    truncate: true,
  });
  done();
});

after((done) => {
  Url.destroy({
    where: {},
    truncate: true,
  });
  done();
});

describe(
  "Get requests for urls",
  it("Should return all urls", (done) => {
    addUrl();
    chai
      .request(startServer())
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
      })
      .expect(200, done());
  }),

  it("Should return 404 if no urls in db", (done) => {
    chai
      .request(startServer())
      .get("/")
      .end((res, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(0);
      })
      .expect(200, done());
  })
);

describe(
  "Post requests for urls",
  it("Should post a valid product", (done) => {
    chai.request(startServer()).post("/");
  })
);
