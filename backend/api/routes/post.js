const { Router } = require("express");
const { isAuthenticated } = require("../../utils/auth");
const {
  savePost,
  getPost,
  getAllPosts,
  likeOrDislikePost,
  deletePostsById,
  deleteSinglePostById,
  postComment,
  deleteComment,
  getCountofPostsByUser,
} = require("../controller/postController");

const router = Router();

router
  .post("/", isAuthenticated, savePost)
  .get("/:postId", isAuthenticated, getPost)
  .delete("/:postId", isAuthenticated, deleteSinglePostById);
router
  .get("/", isAuthenticated, getAllPosts)
  .delete("/", isAuthenticated, deletePostsById);

router.get("/search/:search", isAuthenticated, getAllPosts);
router.post("/:postId/like", isAuthenticated, likeOrDislikePost);

router
  .post("/:postId/comment", isAuthenticated, postComment)
  .delete("/:postId/comment/:commentId", isAuthenticated, deleteComment);

router.get("/count/:userId", isAuthenticated, getCountofPostsByUser);
module.exports = router;
