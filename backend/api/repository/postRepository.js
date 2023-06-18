const Post = require("../../models/Post");
const ErrorHandler = require("../../utils/errorhandler");

function postRepository() {
  async function createNewPost(body, userId) {
    const post = new Post({ ...body, user: userId });
    await (await post.save()).populate("user", "name avatar email");
    return post;
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
  return Object.freeze({ deleteCompletePost, getPostById, createNewPost });
}

module.exports = postRepository;
