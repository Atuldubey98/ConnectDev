const supertest = require("supertest");
const app = require("../app");
const authenticatedUserPayLoad = {
  email: "test@test.com",
  password: "12345678",
};
exports.authenticatedUserPayLoad = authenticatedUserPayLoad;
const cookies = [];
describe("auth", () => {
  describe("POST : /api/users/login", () => {
    describe("user has not passed correct credentials", () => {
      it("should return 200", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/users/login")
          .send({ email: "hasd", password: "jasjkd" });
        expect(statusCode).toBe(401);
      });
    });
    describe("user has not password email or password", () => {
      it("should return 200", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/users/login")
          .send({ password: "jasjkd" });
        expect(statusCode).toBe(400);
      });
    });
    describe("user has passed correct credentials", () => {
      it("should return 200", async () => {
        const { headers, statusCode, body } = await supertest(app)
          .post("/api/users/login")
          .send(authenticatedUserPayLoad);
        const cookie = headers["set-cookie"];
        cookies.push(...cookie);
        expect(statusCode).toBe(200);
        expect(body).toMatchObject({
          _id: "6470b79ef2e160172645515a",
          name: "Atul Dubey",
          email: "test@test.com",
        });
      });
    });
  });
  describe("POST : /api/users/register", () => {
    describe("user has not passed correct payload", () => {
      it("should return 400", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/users/register")
          .send({ email: "hasd", password: "jasjkd" });
        expect(statusCode).toBe(400);
      });
    });
    describe("user has not passed correct email id", () => {
      it("should return 400", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/users/register")
          .send({ email: "hasd", password: "jasjkd", name: "hjasdhkj" });
        expect(statusCode).toBe(400);
      });
    });
  });
  describe("GET : /api/users", () => {
    describe("user is not authenticated", () => {
      it("should return 200", async () => {
        const { statusCode } = await supertest(app).get("/api/users");
        expect(statusCode).toBe(401);
      });
    });
    describe("user has authenticated", () => {
      it("should return 200", async () => {
        const { statusCode } = await supertest(app)
          .get("/api/users")
          .set("Cookie", cookies);
        expect(statusCode).toBe(200);
      });
    });
  });
});
