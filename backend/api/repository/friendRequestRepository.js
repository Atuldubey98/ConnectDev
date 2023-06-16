const FriendRequest = require("../../models/FriendRequest");

function friendRequestRepository() {
  async function createFriendRequest(friendRequestBody) {
    const friendRequest = new FriendRequest(friendRequestBody);
    await friendRequest.save();
    return friendRequest;
  }
  async function getFriendRequests(userId) {
    const friendRequests = await FriendRequest.find({
      recipient: userId,
      status: "requested",
    }).populate({
      path: "requestor",
      select: "name email avatar _id",
    });
    return friendRequests;
  }
  async function getFriendRequestByUserAndFriendUserId(userId, friendUserId) {
    const request = await FriendRequest.findOne({
      $or: [
        {
          $and: [{ requestor: friendUserId }, { recipient: userId }],
        },
        {
          $and: [{ requestor: userId }, { recipient: friendUserId }],
        },
      ],
    });
    return request;
  }
  return Object.freeze({
    createFriendRequest,
    getFriendRequests,
    getFriendRequestByUserAndFriendUserId,
  });
}

module.exports = friendRequestRepository;
