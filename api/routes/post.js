const { Router } = require("express");
const { isAuthenticated } = require("../../utils/auth");
const {
  savePost,
  getPost,
  getAllPosts,
  likeOrDislikePost,
  deletePostsById,
  deleteSinglePostById,
} = require("../controller/postController");

const router = Router();
router.post("/", isAuthenticated, savePost);
router.post("/like", isAuthenticated, likeOrDislikePost);
router.delete("/all", isAuthenticated, deletePostsById);
router.delete("/", isAuthenticated, deleteSinglePostById);

router.get("/", isAuthenticated, getPost);
router.get("/all", isAuthenticated, getAllPosts);

module.exports = router;
