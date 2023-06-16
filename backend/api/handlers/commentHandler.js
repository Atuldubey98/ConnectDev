const Notification = require("../../models/Notification");
const Post = require("../../models/Post");
const User = require("../../models/User");
const logger = require("../../utils/logger");

function commentHandler(socket, io) {
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
      const comments = post.comments;
      if (socket.user.id != post.user.toString()) {
        const { name } = await User.findById(socket.user.id).select("name");
        const taggedCommentId = `comment-${commentId}`;
        const message =
          comments.length > 1
            ? `${name} and ${comments.length} others commented on your post`
            : `${name} commented on your post`;
        const href = `/posts/${_id}#${taggedCommentId}`;
        const notification = new Notification({
          user: post.user.toString(),
          href,
          message,
        });
        await notification.save();
        io.to("post:" + _id).emit("notify:success", notification);
      }
    }
  };
}
module.exports = commentHandler;
