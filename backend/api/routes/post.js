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
} = require("../controller/postController");

const router = Router();

router
  .post("/", isAuthenticated, savePost)
  .get("/", isAuthenticated, getPost)
  .delete("/", isAuthenticated, deleteSinglePostById);
router
  .get("/all", isAuthenticated, getAllPosts)
  .delete("/all", isAuthenticated, deletePostsById);

router.get("/search/:search", isAuthenticated, getAllPosts);
router.post("/like", isAuthenticated, likeOrDislikePost);

router
  .post("/comment", isAuthenticated, postComment)
  .delete("/comment", isAuthenticated, deleteComment);

module.exports = router;
