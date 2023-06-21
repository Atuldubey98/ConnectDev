const Comments = require("../../models/Comments");
const Likes = require("../../models/Likes");
const Post = require("../../models/Post");
const ErrorHandler = require("../../utils/errorhandler");

function postRepository() {
  async function createNewPost(body, userId) {
    const post = new Post({ ...body, user: userId });
    await (await post.save()).populate("user", "name avatar email");
    return post;
  }
  async function createNewCommentByPostId(comment) {
    const newComment = new Comments(comment);
    const populatedComment = await (
      await newComment.save()
    ).populate({
      path: "user",
      select: "name avatar _id",
    });
    return populatedComment;
  }
  async function findPostByIdOrError(postId) {
    if (!postId) {
      throw new ErrorHandler("PAYLOAD_ERROR", 400);
    }
    const post = await Post.findById(postId);
    if (!post) {
      throw new ErrorHandler("POST_NOT_FOUND", 404);
    }
    return post;
  }
  async function dislikeThePostById(postId, userId, likeId) {
    if (typeof postId !== "string" || !userId || !likeId)
      throw new ErrorHandler("PAYLOAD_ERROR", 400);
    await Likes.deleteOne({ user: userId, post: postId });
    await Post.updateOne(
      { _id: postId },
      {
        $pull: {
          likes: likeId,
        },
      }
    );
  }
  async function likePostById(postId, userId) {
    if (typeof postId !== "string" || !userId) {
      console.log(typeof userId);
      throw new ErrorHandler("PAYLOAD_ERROR", 400);
    }
    const like = new Likes({ user: userId, post: postId });
    await like.save();
    await Post.updateOne(
      { _id: postId },
      {
        $push: {
          likes: like._id,
        },
      }
    );
  }
  async function getPostById(postId) {
    if (typeof postId !== "string") {
      throw new ErrorHandler("PAYLOAD_ERROR", 400);
    }
    const post = await Post.findById(postId)
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
    return post;
  }
  async function deleteCompletePost(postId) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new ErrorHandler("Post not found", 400);
    }
    if (post.likes.length > 0) {
      await Likes.deleteMany({ _id: { $in: post.likes } });
    }
    if (post.comments.length > 0) {
      await Comments.deleteMany({ _id: { $in: post.comments } });
    }
    await Post.deleteOne({ _id: postId });
  }
  async function paginatePostsByQuery(query, page, limit) {
    if (typeof query !== "object") {
      return null;
    }
    const postPaginated = await Post.paginate(query, {
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
            select: "name email avatar _id",
          },
        },
        {
          path: "comments",
          populate: {
            path: "user",
            select: "name email avatar _id",
          },
          sort: { createdAt: -1 },
        },
        {
          path: "user",
          select: "name email avatar _id",
        },
      ],
      customLabels: {
        totalDocs: "totalCount",
        docs: "posts",
        nextPage: "next",
        prevPage: "prev",
      },
    });
    return postPaginated;
  }
  return Object.freeze({
    deleteCompletePost,
    getPostById,
    createNewPost,
    likePostById,
    dislikeThePostById,
    findPostByIdOrError,
    paginatePostsByQuery,
    createNewCommentByPostId,
  });
}

module.exports = postRepository;
