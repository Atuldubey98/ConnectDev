const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const agent = chai.request.agent(app);
const Post = require("../models/Post");
before(async () => {
  await Post.deleteMany({});
});
after(async () => {
  await Post.deleteMany({});
  await User.deleteMany({});
});
describe("Posts Controller requests", () => {
  describe("unauthenticated requests", () => {
    describe("get all posts", () => {
      it("should return 401", async () => {
        const response = await agent.get("/api/posts");
        expect(response).to.have.status(401);
      });
    });
    describe("post a new post", () => {
      it("should return 401", async () => {
        const response = await agent.post("/api/posts");
        expect(response).to.have.status(401);
      });
    });
    describe("get a post", () => {
      it("should return 401", async () => {
        const response = await agent.get("/api/posts/hasjdhasd");
        expect(response).to.have.status(401);
      });
    });
    describe("delete a post", () => {
      it("should return 401", async () => {
        const response = await agent.delete("/api/posts/hasjdhasd");
        expect(response).to.have.status(401);
      });
    });
    describe("search a post by text or title", () => {
      it("should return 401", async () => {
        const response = await agent.get("/api/posts/search/hasjkdads");
        expect(response).to.have.status(401);
      });
    });
  });
  describe("authenticated requests", () => {
    let token;
    let newPostId;
    before(async () => {
      const response = await agent.post("/api/users/login").send({
        email: "atuldubey017@gmail.com",
        password: "123456789",
      });
      token = response.headers["set-cookie"];
    });
    describe("post a new post", () => {
      it("should return 201", async () => {
        const response = await agent
          .post("/api/posts")
          .set("Cookie", token)
          .send({ text: "text", title: "title" });
          console.log(token)
        newPostId = response.body.post._id;
        expect(response).to.have.status(201);
        expect(response.body.post).to.have.property("_id").that.is.a("string");
        expect(response.body.post).to.have.property("text").that.is.a("string");
        expect(response.body.post)
          .to.have.property("title")
          .that.is.a("string");
        expect(response.body.post).to.have.property("likes").that.is.a("array");
        expect(response.body.post)
          .to.have.property("comments")
          .that.is.a("array");
      });
    });
    describe("get all posts", () => {
      it("should return 200", async () => {
        const response = await agent.get("/api/posts").set("Cookie", token);
        expect(response).to.have.status(200);
        expect(response.body).to.have.property("posts").that.is.a("array");
      });
    });
    describe("get a post", () => {
      it("should return 200", async () => {
        const response = await agent
          .get(`/api/posts/${newPostId}`)
          .set("Cookie", token);
        expect(response).to.have.status(200);
      });
    });
    describe("delete a post", () => {
      it("should return 204", async () => {
        const response = await agent
          .delete(`/api/posts/${newPostId}`)
          .set("Cookie", token);
        expect(response).to.have.status(204);
      });
    });
  });
});
