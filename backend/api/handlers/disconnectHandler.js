const User = require("../../models/User");
const logger = require("../../utils/logger");

function disconnectHandler(socket, io) {
  async function getCurrentUserFriends(userId) {
    const friends = await FriendRequest.find({
      $or: [{ requestor: userId }, { recipient: userId }],
      status: "accepted",
    }).select("_id");
    return friends;
  }
  return async () => {
    await User.updateOne(
      { _id: socket.user.id },
      {
        isActiveNow: false,
        lastActive: new Date(Date.now()),
      }
    );
    const friends = await getCurrentUserFriends(socket.user.id);
    const friendIds = friends.map((friend) => friend._id);
    friendIds.forEach((friendId) => {
      io.to(`friend:${friendId}`).emit("friendActive:status", {
        friendUserId: socket.user.id,
        isActiveNow: false,
      });
    });
    logger.warn({ level: "info", message: `Disconnecting ---- >${socket.id}` });
  };
}

module.exports = disconnectHandler;
