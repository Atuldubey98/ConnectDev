const chai = require("chai");

const chaiHttp = require("chai-http");
const app = require("../app");
chai.use(chaiHttp);
const expect = chai.expect;
describe("Health of Server", function () {
  describe("Checking health of server", function () {
    describe("/api/health", function () {
      it("should return 200", async function () {
        const response = await chai.request(app).get("/api/health");
        expect(response.text).to.be.equal("Server is healthy");
      });
    });
  });
});
