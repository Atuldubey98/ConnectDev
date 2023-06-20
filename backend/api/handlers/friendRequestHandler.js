const FriendRequest = require("../../models/FriendRequest");
const logger = require("../../utils/logger");

function friendRequestHandler(socket, io) {
  async function friendRequestSend(friendRequestId) {
    const friendRequest = await FriendRequest.findById(
      friendRequestId
    ).populate({
      path: "requestor",
      select: "name email _id avatar",
    });
    io.to(friendRequest.recipient.toString()).emit(
      "friendRequest:recieved",
      friendRequest
    );
    logger.info({
      level: "info",
      message: `Friend request sent to ---- >${friendRequest.recipient.toString()} --> ${
        socket.user.name
      }`,
    });
  }
  async function friendRequestAccept(friendRequest) {
    io.to(friendRequest.requestor.toString()).emit(
      "friendRequest:accepted",
      friendRequest
    );
    logger.info({
      level: "info",
      message: `Friend request accepted by ---- >${friendRequest.recipient.toString()} --> ${
        socket.user.name
      }`,
    });
  }
  async function friendRequestCancel(friendRequest) {
    io.to(friendRequest.recipient.toString()).emit(
      "friendRequest:cancelled",
      friendRequest._id
    );
    logger.info({
      level: "info",
      message: `Friend request cancelled by ---- >${friendRequest.requestor.toString()} --> ${
        socket.user.name
      }`,
    });
  }
  return Object.freeze({
    friendRequestSend,
    friendRequestAccept,
    friendRequestCancel,
  });
}

module.exports = friendRequestHandler;
