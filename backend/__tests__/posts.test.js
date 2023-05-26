const supertest = require("supertest");
const app = require("../app");
const { authenticatedUserPayLoad } = require("./auth.test");
const postPayload = {
  text: "This is text",
  title: "This is title",
};
let postId = "";
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
  describe("POST : /api/post", () => {
    describe("user is not logged in", () => {
      it("should return 401", async () => {
        const { statusCode } = await supertest(app).get("/api/post");
        expect(statusCode).toBe(401);
      });
    });
    describe("payload is not complete", () => {
      it("should return 400", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/post")
          .send({ text: "This is text" })
          .set("Cookie", cookies);
        expect(statusCode).toBe(400);
      });
    });
    describe("payload is empty", () => {
      it("should return 400", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/post")
          .send({})
          .set("Cookie", cookies);
        expect(statusCode).toBe(400);
      });
    });
    describe("payload is complete", () => {
      it("should return 201", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/post")
          .send(postPayload)
          .set("Cookie", cookies);
        const post = body.post;
        expect(post).toHaveProperty("_id");
        expect(post).toHaveProperty("title", postPayload.title);
        expect(post).toHaveProperty("text", postPayload.text);
        expect(post).toHaveProperty("likes");
        expect(post).toHaveProperty("comments");
        expect(post).toHaveProperty("user._id", "6470b79ef2e160172645515a");
        expect(post).toHaveProperty("user.name", "Atul Dubey");
        expect(post).toHaveProperty("user.email", "test@test.com");
        expect(post).toHaveProperty("color");

        postId = post._id;
        expect(statusCode).toBe(201);
      });
    });
  });
  describe("POST : /api/post/like", () => {
    describe("user is not logged in", () => {
      it("should return 401", async () => {
        const { statusCode } = await supertest(app).post("/api/post/like");
        expect(statusCode).toBe(401);
      });
    });
    describe("user has logged in and liked the post without payload", () => {
      it("should return 400", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/post/like")
          .set("Cookie", cookies);
        expect(statusCode).toBe(400);
      });
    });
    describe("user has logged in and unliked the post without the payload", () => {
      it("should return 400", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/post/like")
          .set("Cookie", cookies);
        expect(statusCode).toBe(400);
      });
    });
    describe("user has logged in and liked the post with payload", () => {
      it("should return 200", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/post/like")
          .send({ postId })
          .set("Cookie", cookies);
        const { body } = await supertest(app)
          .get(`/api/post?postId=${postId}`)
          .set("Cookie", cookies);
        const userIds = body.likes.map((like) => like.user._id);
        expect(userIds).toEqual(
          expect.arrayContaining(["6470b79ef2e160172645515a"])
        );
        expect(statusCode).toBe(200);
      });
    });
    describe("user has logged in and unliked the post with the payload", () => {
      it("should return 200", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/post/like")
          .send({ postId })
          .set("Cookie", cookies);
        const { body } = await supertest(app)
          .get(`/api/post?postId=${postId}`)
          .set("Cookie", cookies);
        const userIds = body.likes.map((like) => like.user._id);
        expect(userIds).toEqual(
          expect.not.arrayContaining(["6470b79ef2e160172645515a"])
        );
        expect(statusCode).toBe(200);
      });
    });
  });
  describe("POST : /api/post/comment", () => {
    describe("user is not logged in", () => {
      it("should return 401", async () => {
        const { statusCode } = await supertest(app).post("/api/post/comment");
        expect(statusCode).toBe(401);
      });
    });
    describe("user has logged in and comment the post without payload", () => {
      it("should return 400", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/post/comment")
          .send({ text: "This is comment" })
          .set("Cookie", cookies);
        expect(statusCode).toBe(400);
      });
    });
  });
  describe("DELETE : /api/post", () => {
    describe("user is not logged in", () => {
      it("should return 401", async () => {
        const { statusCode } = await supertest(app).delete("/api/post");
        expect(statusCode).toBe(401);
      });
    });
    describe("payload is not complete", () => {
      it("should return 400", async () => {
        const { statusCode } = await supertest(app)
          .delete("/api/post")
          .set("Cookie", cookies);
        expect(statusCode).toBe(400);
      });
    });
    describe("payload is complete", () => {
      it("should return 204", async () => {
        const { statusCode } = await supertest(app)
          .delete(`/api/post?postId=${postId}`)
          .set("Cookie", cookies);
        expect(statusCode).toBe(204);
      });
    });
    describe("payload is complete but post does not exist", () => {
      it("should return 400", async () => {
        const { statusCode } = await supertest(app)
          .delete(`/api/post?postId=${postId}`)
          .set("Cookie", cookies);
        expect(statusCode).toBe(400);
      });
    });
  });
});
