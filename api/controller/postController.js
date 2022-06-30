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
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  const posts = await Post.find({}, undefined, { skip, limit: 5 }).sort({
    date: "desc",
  });
  return res.status(200).json({
    count: posts.length,
    posts,
    status: true,
  });
});
