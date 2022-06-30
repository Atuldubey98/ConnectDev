const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Post = require("../../models/Post");

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
  const posts = await Post.find({ text: { $regex: s } }, undefined, {
    skip: page * limit,
    limit,
  }).sort({
    date: "desc",
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
