const Post = require("../../models/Post");
const logger = require("../../utils/logger");
const notificationRepository = require("../repository/notificationRepostory");

function likePostHandler(socket, io) {
  const { createNotification } = notificationRepository();
  function generateMessageAndLink(notification) {
    const isValidNotification =
      typeof notification === "object" ||
      typeof notification.name === "string" ||
      typeof notification.totalLikes === "number" ||
      typeof notification.postId === "string";
    if (!isValidNotification) {
      return null;
    }
    const { totalLikes, name, postId } = notification;
    const message =
      totalLikes > 1
        ? `${name} & ${totalLikes - 1} others liked your post`
        : `${name} liked your post`;
    const href = `/posts/${postId}`;
    return { message, href };
  }
  return async (data) => {
    const { _id, liked } = data;
    const post = await Post.findById(_id).select("likes user");
    if (!post) {
      logger.error({
        level: "info",
        message: `Post not found with id ${_id}`,
      });
      io.to("post:" + _id).emit("notify:error", {
        message: `Post was deleted`,
      });
    } else {
      const isPostCreatorCurrentUserSame =
        socket.user.id !== post.user.toString();
      if (isPostCreatorCurrentUserSame) {
        logger.info({
          level: "info",
          message: `${socket.user.id} liked post with id---- >${_id} of ${post.user}`,
        });

        const { likes } = post;
        const { message, href } = generateMessageAndLink({
          name: socket.user.name,
          postId: _id,
          totalLikes: likes.length,
        });
        const response = { user: socket.user, post: _id };
        if (liked) {
          io.to("post:" + _id).emit("like", response);
          const notification = await createNotification(
            post.user.toString(),
            href,
            message
          );
          io.to("post:" + _id).emit("notify:success", notification);
        } else {
          io.to("post:" + _id).emit("unlike", response);
        }
      }
    }
  };
}

module.exports = likePostHandler;
