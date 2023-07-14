const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const agent = chai.request.agent(app);
const User = require("../models/User");
before(async () => {
  await User.deleteMany({});
});

describe("Authentication & Authorization", () => {
  describe("Register the user in the database", () => {
    describe("If name or email address is not provided", () => {
      it("should return 400 and user should not be created", async function () {
        const response = await agent
          .post("/api/users/register")
          .send({ name: "Atul", password: "ashdjasd" });
        expect(response.status).to.be.equal(400);
      });
    });
    describe("If name or email address is not provided", () => {
      it("should return 400 and user should not be created", async function () {
        const response = await agent.post("/api/users/register").send({
          email: "atuldubey017",
          name: "Atul Dubey",
          password: "ashdjasd",
        });
        expect(response.status).to.be.equal(400);
      });
    });
    describe("If payload is correct", () => {
      it("should return 201 and user should be created", async function () {
        const response = await agent.post("/api/users/register").send({
          name: "Atul Dubey",
          email: "atuldubey017@gmail.com",
          password: "123456789",
        });
        expect(response.status).to.be.equal(201);
        expect(response.body.status).to.be.equal(true);
        expect(response.body.message).to.be.equal("User created");
      });
    });
  });
  describe("Login the user", () => {
    describe("If email address or password is not provided", () => {
      it("should return 400 and user should not be logged in", async function () {
        const response = await agent
          .post("/api/users/login")
          .send({ email: "atuldubey017@gmail.com" });
        expect(response.status).to.be.equal(400);
      });
    });
    describe("If name or email address is provided but incorrect", () => {
      it("should return 401 and user should not be created", async function () {
        const response = await agent.post("/api/users/login").send({
          email: "atuldubey017@gmai.com",
          password: "ashdjasd",
        });
        expect(response.status).to.be.equal(401);
      });
    });
    describe("If payload is correct", () => {
      it("should return 200 and user should be logged in", async function () {
        const response = await agent.post("/api/users/login").send({
          email: "atuldubey017@gmail.com",
          password: "123456789",
        });
        expect(response.status).to.be.equal(200);
        expect(response).to.have.cookie("token");
      });
    });
  });
  describe("Authenticated requests", () => {
    describe("if user has not logged in", () => {
      it("should return 401", async () => {
        const response = await agent.get("/api/users");
        expect(response.status).to.be.equal(401);
      });
    });
    describe("if user is logged in", () => {
      let token;
      before(async () => {
        const response = await agent.post("/api/users/login").send({
          email: "atuldubey017@gmail.com",
          password: "123456789",
        });
        token = response.headers["set-cookie"];
      });
      describe("get the the current user", () => {
        it("should return 200 and the user logged in", async () => {
          const response = await agent.get("/api/users").set("Cookie", token);
          expect(response.status).to.be.equal(200);
          expect(response.body.email).to.be.equal("atuldubey017@gmail.com");
          expect(response.body).to.have.property("_id").that.is.a("string");
        });
      });
      describe("get the the current user", () => {
        it("should return 200 and the user logged in", async () => {
          const response = await agent
            .get("/api/users/search/Atul")
            .set("Cookie", token);
          expect(response.body.users).that.is.a("array");
        });
      });
    });
  });
});
