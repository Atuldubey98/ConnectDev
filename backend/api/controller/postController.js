const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Post = require("../../models/Post");
const Comments = require("../../models/Comments");

const Likes = require("../../models/Likes");
const User = require("../../models/User");

exports.savePost = catchAsyncErrors(async (req, res, next) => {
  const post = new Post({ ...req.body, user: req.user._id });
  await (await post.save()).populate("user", "name avatar email");

  return res.status(201).json({ status: true, post });
});

exports.getPost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findById(req.query.id)
    .populate({
      path: "likes",
      populate: {
        path: "user",
        select: "name email",
      },
    })
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "name email",
      },
    });

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
  return res.status(200).json({
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
  const postRes = await Post.paginate(
    {},
    {
      page,
      limit,
      collation: {
        locale: "en",
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
    }
  );
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

  return res.status(200).json({
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
