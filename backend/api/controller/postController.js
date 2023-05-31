const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Post = require("../../models/Post");
const Comments = require("../../models/Comments");

const Likes = require("../../models/Likes");
const User = require("../../models/User");
const { sanitizeFilter } = require("mongoose");
const { sanitizeFilterUtil } = require("../../utils/sanitize");

exports.savePost = catchAsyncErrors(async (req, res, next) => {
  const post = new Post({ ...req.body, user: req.user._id });
  await (await post.save()).populate("user", "name avatar email");

  return res.status(201).json({ status: true, post });
});

exports.getPost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.query.postId)
    .populate({
      path: "likes",
      populate: {
        path: "user",
        select: "name email _id",
      },
    })
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "name email _id avatar",
      },
    })
    .populate("user", "_id name avatar email");

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
  return res.status(204).json({
    status: true,
    deletedCount,
  });
});

exports.deleteSinglePostById = catchAsyncErrors(async (req, res) => {
  const { postId } = req.query;
  const post = await Post.findById(postId);

  if (!post)
    return res.status(400).json({
      status: false,
      message: "Not exist",
    });
  if (post.likes.length > 0) {
    await Likes.deleteMany({ _id: { $in: post.likes } });
  }
  if (post.comments.length > 0) {
    await Comments.deleteMany({ _id: { $in: post.comments } });
  }
  await Post.deleteOne({ _id: postId });
  return res.status(204).json({
    status: true,
    message: "Deleted",
  });
});

exports.getAllPosts = catchAsyncErrors(async (req, res, next) => {
  const page =
    typeof req.query.page === "string" && !isNaN(Number(req.query.page))
      ? Number(req.query.page)
      : 1;
  const limit =
    typeof req.query.limit === "string" && !isNaN(Number(req.query.limit))
      ? Number(req.query.limit)
      : 10;
  const search = typeof req.params.search === "string" ? req.params.search : "";
  const filter = sanitizeFilterUtil(req.query.filter);
  const query =
    search.length === 0
      ? { ...filter }
      : {
          ...filter,
          $or: [
            { text: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" } },
          ],
        };

  const postRes = await Post.paginate(query, {
    page,
    limit,
    collation: {
      locale: "en",
    },
    sort: {
      createdAt: -1,
    },
    populate: [
      {
        path: "likes",
        populate: {
          path: "user",
          select: "name email avatar",
        },
      },
      {
        path: "comments",
        populate: {
          path: "user",
          select: "name email avatar",
        },
        sort: { createdAt: -1 },
      },
      {
        path: "user",
        select: "name email avatar",
      },
    ],
    customLabels: {
      totalDocs: "totalCount",
      docs: "posts",
      nextPage: "next",
      prevPage: "prev",
    },
  });
  return res.status(200).send(postRes);
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
    return res
      .status(200)
      .json({ status: true, message: "Post Liked", user: req.user });
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
  return res
    .status(200)
    .json({ status: false, message: "Post Disliked", user: req.user });
});

exports.postComment = catchAsyncErrors(async (req, res, next) => {
  const { postId, ...data } = req.body;
  if (!postId) {
    return res.status(400).json({ status: false });
  }
  const postById = await Post.findById(postId);
  if (!postById) {
    return res.status(400).json({ status: false });
  }
  const comment = new Comments({ user: req.user._id, post: postId, ...data });
  await comment.save();

  await Post.updateOne(
    { _id: postId },
    {
      $push: {
        comments: comment._id,
      },
    }
  );

  return res.status(201).json({
    status: true,
    message: "Commented",
    comment: { ...comment._doc, user: req.user },
  });
});

exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
  const commentId = req.query.commentId || "";
  const postId = req.query.postId || "";
  if (!commentId || !postId) {
    return res.status(400).json({ status: false });
  }
  const comment = await Comments.findByIdAndRemove(commentId);
  if (!comment) {
    return res.status(400).json({ status: false });
  }
  await Post.updateOne(
    { _id: postId },
    {
      $pull: {
        comments: commentId,
      },
    }
  );
  return res.status(200).json({ status: true, message: "Deleted" });
});

exports.getCountofPostsByUser = catchAsyncErrors(async (req, res, next) => {
  const { userId: userParams } = req.params;
  const userId = userParams || "";
  const user = await User.findById(userId);
  console.log(user);
  const count = await Post.count({ user: user ? userId : req.user._id });
  return res.status(200).json(count);
});
