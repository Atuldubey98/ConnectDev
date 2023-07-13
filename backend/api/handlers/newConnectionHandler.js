const Post = require("../../models/Post");
const logger = require("../../utils/logger");
const commentHandler = require("./commentHandler");
const roomJoinHandler = require("./roomJoinHandler");

const disconnectHandler = require("./disconnectHandler");
const friendRequestHandler = require("./friendRequestHandler");
const likePostHandler = require("./likePostHandler");
const User = require("../../models/User");
const messageHandler = require("./messageHandler");
const { getContactIdsOfCurrentUserToSubscribe } =
  require("../repository/contactRepository")();
const { getCurrentUserFriends } =
  require("../repository/friendRequestRepository")();
function newConnectionHandler(io) {
  return async (socket) => {
    socket.on("join", roomJoinHandler(socket));
    const { friendRequestSend, friendRequestAccept, friendRequestCancel } =
      friendRequestHandler(socket, io);
    const { sendMessageHandler } = messageHandler(socket, io);
    socket.on("like", likePostHandler(socket, io));
    socket.on("message:send", sendMessageHandler);
    socket.on("friendRequest:send", friendRequestSend);
    socket.on("friendRequest:accept", friendRequestAccept);
    socket.on("friendRequest:cancel", friendRequestCancel);
    socket.on("comment", commentHandler(socket, io));
    socket.on("disconnect", disconnectHandler(socket, io));
    try {
      logger.info({
        level: "info",
        message: `Connected ---- >${socket.id} --> ${socket.user.name}`,
      });
      await User.findByIdAndUpdate(socket.user.id, {
        isActiveNow: true,
      });
      const posts = await Post.find({ user: socket.user.id }).select("_id");
      socket.join(socket.user.id);
      const friends = await getCurrentUserFriends(socket.user.id);
      const friendIds = friends.map((friend) => friend._id);
      friendIds.forEach((friendId) => socket.join(`friend:${friendId}`));
      posts.forEach((post) => socket.join("post:" + post._id));
      friendIds.forEach((friendId) => {
        io.to(`friend:${friendId}`).emit("friendActive:status", {
          friendUserId: socket.user.id,
          isActiveNow: true,
        });
      });
      let contactIds = await getContactIdsOfCurrentUserToSubscribe(
        socket.user.id
      );
      contactIds = contactIds.map((contactId) => contactId._id);
      contactIds.forEach((contactId) => socket.join(`contact:${contactId}`));
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = newConnectionHandler;
