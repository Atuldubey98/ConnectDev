const supertest = require("supertest");
const app = require("../app");
const cookies = [];
const authenticatedUserPayLoad = {
  email: "test@test.com",
  password: "12345678",
};
const profile = {
  skills: [],
  experience: [],
  education: [],
  status: "Here is my status",
  handle: [],
};
describe("profile", () => {
  describe("GET : /api/profile", () => {
    describe("user is not logged in", () => {
      it("should return 401 unauthorized error", async () => {
        const { statusCode } = await supertest(app).get("/api/profile");
        expect(statusCode).toBe(401);
      });
    });
    describe("user is logged in and profile exists", () => {
      it("should return 200 unauthorized error", async () => {
        const { headers } = await supertest(app)
          .post("/api/users/login")
          .send(authenticatedUserPayLoad);
        const cookie = headers["set-cookie"];
        cookies.push(...cookie);
        const { statusCode } = await supertest(app)
          .get("/api/profile")
          .set("Cookie", cookies);
        expect(statusCode).toBe(200);
      });
    });
    describe("user is logged in and profile does not exist", () => {
      it("should return 200 unauthorized error", async () => {
        const { headers } = await supertest(app).post("/api/users/login").send({
          email: "test2@test.com",
          password: "1234567",
        });
        const cookie = headers["set-cookie"];
        const { statusCode } = await supertest(app)
          .get("/api/profile")
          .set("Cookie", cookie);
        expect(statusCode).toBe(400);
      });
    });
  });
  describe("POST : /api/profile", () => {
    describe("user not logged in", () => {
      it("should return 401 unauthorized", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/profile")
          .send(profile);
        expect(statusCode).toBe(401);
      });
    });
    describe("user not logged in", () => {
      it("should return 201 Created", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/profile")
          .set("Cookie", cookies)
          .send(profile);
        expect(body.status).toBe("Here is my status");
        expect(statusCode).toBe(201);
      });
    });
  });
});
