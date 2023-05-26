const supertest = require("supertest");
const app = require("../app");
const { authenticatedUserPayLoad } = require("./auth.test");
const cookies = [];
describe("posts", () => {
  describe("GET : /api/post/all", () => {
    describe("user is not logged in", () => {
      it("should return 401", async () => {
        const { statusCode } = await supertest(app).get("/api/post/all");
        expect(statusCode).toBe(401);
      });
    });
    describe("user has logged in", () => {
      it("should return 200", async () => {
        const { headers } = await supertest(app)
          .post("/api/users/login")
          .send(authenticatedUserPayLoad);
        const cookie = headers["set-cookie"];
        cookies.push(...cookie);
        const { statusCode } = await supertest(app)
          .get("/api/post/all")
          .set("Cookie", cookies);
        expect(statusCode).toBe(200);
      });
    });
  });
});
