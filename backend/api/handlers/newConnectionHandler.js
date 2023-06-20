const Post = require("../../models/Post");
const logger = require("../../utils/logger");
const commentHandler = require("./commentHandler");
const roomJoinHandler = require("./roomJoinHandler");

const disconnectHandler = require("./disconnectHandler");
const friendRequestHandler = require("./friendRequestHandler");
const likePostHandler = require("./likePostHandler");
const FriendRequest = require("../../models/FriendRequest");
const User = require("../../models/User");

function newConnectionHandler(io) {
  async function getCurrentUserFriends(userId) {
    const friends = await FriendRequest.find({
      $or: [{ requestor: userId }, { recipient: userId }],
      status: "accepted",
    }).select("_id");
    return friends;
  }
  return async (socket) => {
    socket.on("join", roomJoinHandler(socket));
    const { friendRequestSend, friendRequestAccept, friendRequestCancel } =
      friendRequestHandler(socket, io);
    socket.on("like", likePostHandler(socket, io));
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
    } catch (error) {
      console.error(error);
    }
  };
}

module.exports = newConnectionHandler;
