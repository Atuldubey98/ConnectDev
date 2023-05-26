const supertest = require("supertest");
const app = require("../app");
describe("health", () => {
  describe("server on running", () => {
    describe("GET : /api/health", () => {
      it("should return 200", async () => {
        const { statusCode } = await supertest(app).get("/api/health");
        expect(statusCode).toBe(200);
      });
    });
  });
});
