const { Router } = require("express");
const { isAuthenticated } = require("../../utils/auth");
const { savePost, getPost, getAllPosts } = require("../controller/postController");

const router = Router();
router.post("/",isAuthenticated, savePost);
router.get("/",isAuthenticated, getPost);
router.get("/all",isAuthenticated, getAllPosts);


module.exports=router;