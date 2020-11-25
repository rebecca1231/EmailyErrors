const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const expect = chai.expect;
const server = require("../index.js");

chai.use(chaiHttp);

describe("Server!", () => {
  it("welcomes user to the api", (done) => {
    chai
      .request("http://localhost:3000")
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("unauthorized get request is rejected", (done) => {
    chai
      .request("http://localhost:3000")
      .get("/api/surveys")
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it("unauthorized post request is rejected", (done) => {
    chai
      .request("http://localhost:3000")
      .post("/api/surveys")
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });


});
