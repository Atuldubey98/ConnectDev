const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Post = require("../../models/Post");
const Comments = require("../../models/Comments");
const ErrorHandler = require("../../utils/errorhandler");
const Likes = require("../../models/Likes");
const User = require("../../models/User");
const {
  sanitizeFilterUtil,
  getPaginationFilter,
} = require("../../utils/sanitize");
const {
  deleteCompletePost,
  createNewPost,
  getPostById,
  paginatePostsByQuery,
  dislikeThePostById,
  findPostByIdOrError,
  likePostById,
  createNewCommentByPostId,
} = require("../repository/postRepository")();

exports.savePost = catchAsyncErrors(async (req, res, next) => {
  const post = await createNewPost(req.body, req.user._id);
  return res.status(201).json({ status: true, post });
});

exports.getPost = catchAsyncErrors(async (req, res, next) => {
  const post = await getPostById(req.params.postId);
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
  const { postId } = req.params;
  await deleteCompletePost(postId);
  return res.status(204).json({
    status: true,
    message: "Deleted",
  });
});

exports.getAllPosts = catchAsyncErrors(async (req, res, next) => {
  const { page, limit } = getPaginationFilter(req.query);
  const search = typeof req.params.search === "string" ? req.params.search : "";

  const filter = sanitizeFilterUtil(req.query.filter);
  const query =
    search.length === 0
      ? { ...filter }
      : {
          $text: {
            $search: search,
            $caseSensitive: false,
          },
        };
  const paginatedPosts = await paginatePostsByQuery(query, page, limit);
  return res.status(200).send(paginatedPosts);
});

exports.likeOrDislikePost = catchAsyncErrors(async (req, res, next) => {
  const { postId } = req.params;
  await findPostByIdOrError(postId);
  const like = await Likes.findOne({ post: postId, user: req.user._id });
  if (!like) {
    await likePostById(postId, req.user._id);
    return res
      .status(200)
      .json({ status: true, message: "Post Liked", user: req.user });
  }
  await dislikeThePostById(postId, req.user._id, like._id);
  return res
    .status(200)
    .json({ status: false, message: "Post Disliked", user: req.user });
});

exports.postComment = catchAsyncErrors(async (req, res, next) => {
  const postId = req.params.postId;
  await findPostByIdOrError(postId);
  const comment = await createNewCommentByPostId({
    user: req.user._id,
    post: postId,
    ...req.body,
  });
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
    comment,
  });
});

exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
  const commentId = req.params.commentId || "";
  const postId = req.params.postId || "";
  await findPostByIdOrError(postId);
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
  const count = await Post.count({ user: user ? userId : req.user._id });
  return res.status(200).json(count);
});
