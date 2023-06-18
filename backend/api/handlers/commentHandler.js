const Post = require("../../models/Post");
const User = require("../../models/User");
const logger = require("../../utils/logger");
const notificationRepository = require("../repository/notificationRepostory");

function commentHandler(socket, io) {
  const { createNotification } = notificationRepository();

  function generateMessageAndLink({ totalComments, name, commentId, postId }) {
    const taggedCommentId = `comment-${commentId}`;
    const message =
      totalComments > 1
        ? `${name} and ${totalComments} others commented on your post`
        : `${name} commented on your post`;
    const href = `/posts/${postId}#${taggedCommentId}`;
    return { href, message };
  }
  async function createCommentNotification({ post, commentId }) {
    const { name } = await User.findById(socket.user.id).select("name");
    const { href, message } = generateMessageAndLink({
      totalComments: post.comments.length,
      name,
      commentId,
      postId: post._id,
    });
    const notification = await createNotification(
      post.user.toString(),
      href,
      message
    );
    return notification;
  }
  return async (data) => {
    const { _id, commentId } = data;
    logger.log({
      level: "info",
      message: `${socket.user.id} commenting on post with id---- >${_id}`,
    });
    const post = await Post.findById(_id).select("comments user");
    if (!post) {
      socket.emit("notify:error", {
        message: `Post was deleted`,
        href: "#",
        isError: true,
      });
    } else {
      const isPostCreatorAndCurrentUserDifferent =
        socket.user.id != post.user.toString();
      if (isPostCreatorAndCurrentUserDifferent) {
        const notification = await createCommentNotification({
          commentId,
          post,
        });
        io.to("post:" + _id).emit("notify:success", notification);
      }
    }
  };
}
module.exports = commentHandler;
