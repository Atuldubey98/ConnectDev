const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Post = require("../../models/Post");
const Likes = require("../../models/Likes");

exports.savePost = catchAsyncErrors(async (req, res, next) => {
  const post = new Post({ ...req.body, user: req.user._id });
  await post.save();
  return res.status(201).json({ status: true, post });
});

exports.getPost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.query.id);
  return res.status(200).json(post);
});

exports.getAllPosts = catchAsyncErrors(async (req, res, next) => {
  const page = req.query.page ? Number(req.query.page) : 0;
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const s = req.query.s ? req.query.s : "";
  const totalCount = await Post.estimatedDocumentCount();
  const totalPages = Math.ceil(totalCount / limit);
  let posts = await Post.find({ text: { $regex: s } }, undefined, {
    skip: page * limit,
    limit,
  }).sort({
    date: "desc",
  });
  const likes = await Likes.find({ user: req.user._id });
  posts = posts.map((post) => {
    const isLiked = likes.findIndex((like) => like.post === post._id) !== -1;
    console.log(isLiked);
    return { ...post._doc, isLiked };
  });
  return res.status(200).json({
    totalCount,
    count: posts.length,
    totalPages,
    posts,
    page: page + 1,
    status: true,
  });
});

exports.likeOrDislikePost = catchAsyncErrors(async (req, res, next) => {
  const { postId } = req.body;
  if (!postId) {
    return res.status(400).json({ status: false });
  }
  const likes = await Likes.findOne({ post: postId, user: req.user._id });
  if (!likes) {
    const like = new Likes({ user: req.user._id, post: postId });
    await like.save();
    return res.status(200).json({ status: true, message: "Post Liked" });
  }
  await Likes.deleteOne({ user: req.user._id, post: postId });
  return res.status(200).json({ status: true, message: "Post Disliked" });
});
