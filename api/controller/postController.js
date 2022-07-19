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

exports.deletePostsById = catchAsyncErrors(async (req, res, next) => {
  const { postIds } = req.body;
  if (!postIds && postIds.length < 1) {
    return res.status(400).json({ status: false });
  }
  const { deletedCount } = await Post.deleteMany({
    _id: {
      $in: postIds,
    },
  });
  return res.status(200).json({
    status: true,
    deletedCount,
  });
});

exports.deleteSinglePostById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.query;
  const post = await Post.findById(id);
  if (!post)
    return res.status(400).json({
      status: false,
      message: "Not exist",
    });
  await Post.deleteOne({ _id: id });
  return res.status(200).json({
    status: true,
    message: "Deleted",
  });
});

exports.getAllPosts = catchAsyncErrors(async (req, res, next) => {
  const page = req.query.page ? Number(req.query.page) : 0;
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const s = req.query.s ? req.query.s : "";
  const myPosts = req.query.myPosts ? true : false;
  const totalCount = await Post.find({
    text: { $regex: s },
  }).countDocuments();
  let filter = { text: { $regex: s } };
  if (myPosts) {
    filter.user = req.user._id;
  }
  console.log(filter);
  const posts = await Post.find(filter, undefined, {
    skip: page * limit,
    limit,
  })
    .sort({
      date: "desc",
    })
    .populate("likes");
  const totalPages = Math.ceil(totalCount / limit);
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
  const postById = await Post.findById(postId);
  if (!postById) {
    return res.status(400).json({ status: false });
  }
  const likes = await Likes.findOne({ post: postId, user: req.user._id });
  if (!likes) {
    const like = new Likes({ user: req.user._id, post: postId });
    await like.save();
    await Post.updateOne(
      { _id: postId },
      {
        $push: {
          likes: like._id,
        },
      }
    );
    return res.status(200).json({ status: true, message: "Post Liked" });
  }

  await Likes.deleteOne({ user: req.user._id, post: postId });
  await Post.updateOne(
    { _id: postId },
    {
      $pull: {
        likes: likes._id,
      },
    }
  );
  return res.status(200).json({ status: false, message: "Post Disliked" });
});
