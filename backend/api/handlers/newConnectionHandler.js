const Post = require("../../models/Post");
const logger = require("../../utils/logger");
const commentHandler = require("./commentHandler");
const roomJoinHandler = require("./roomJoinHandler");

const disconnectHandler = require("./disconnectHandler");
const friendRequestHandler = require("./friendRequestHandler");
const likePostHandler = require("./likePostHandler");

function newConnectionHandler(io) {
  return async (socket) => {
    socket.on("join", roomJoinHandler(socket));
    const { friendRequestSend, friendRequestAccept, friendRequestCancel } =
      friendRequestHandler(socket, io);

    socket.on("like", likePostHandler(socket, io));
    socket.on("friendRequest:send", friendRequestSend);
    socket.on("friendRequest:accept", friendRequestAccept);
    socket.on("friendRequest:cancel", friendRequestCancel);
    socket.on("comment", commentHandler(socket, io));
    socket.on("disconnect", disconnectHandler(socket));
    try {
      logger.info({
        level: "info",
        message: `Connected ---- >${socket.id} --> ${socket.user.name}`,
      });
      const posts = await Post.find({ user: socket.user.id }).select("_id");
      socket.join(socket.user.id);
      posts.forEach((post) => socket.join("post:" + post._id));
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = newConnectionHandler;
