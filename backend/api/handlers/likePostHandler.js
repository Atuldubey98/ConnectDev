const Notification = require("../../models/Notification");
const Post = require("../../models/Post");
const logger = require("../../utils/logger");

function likePostHandler(socket, io) {
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
      if (socket.user.id !== post.user.toString()) {
        logger.info({
          level: "info",
          message: `${socket.user.id} liked post with id---- >${_id} of ${post.user}`,
        });

        const { likes } = post;
        const message =
          likes.length > 1
            ? `${socket.user.name} & ${likes.length - 1} others liked your post`
            : `${socket.user.name} liked your post`;
        const href = `/posts/${_id}`;
        const response = { user: socket.user, post: _id };
        if (liked) {
          io.to("post:" + _id).emit("like", response);
          const notification = new Notification({
            user: post.user.toString(),
            href,
            message,
          });
          await notification.save();
          io.to("post:" + _id).emit("notify:success", notification);
        } else {
          io.to("post:" + _id).emit("unlike", response);
        }
      }
    }
  };
}

module.exports = likePostHandler;
