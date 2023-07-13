const FriendRequest = require("../../models/FriendRequest");

function friendRequestRepository() {
  async function findFriendRequestByIdOrError(friendRequestId) {
    if (typeof userId === "string") {
      return null;
    }
    const friendRequest = await FriendRequest.findById(friendRequestId);
    if (!friendRequest) {
      throw new ErrorHandler("PAYLOAD_ERROR", 400);
    }
    return friendRequest;
  }
  async function getCurrentUserAllFriendsRepo(userId) {
    if (typeof userId === "string") {
      return null;
    }
    const results = await FriendRequest.aggregate([
      {
        $match: {
          $or: [{ requestor: userId }, { recipient: userId }],
          status: "accepted",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "requestor",
          foreignField: "_id",
          as: "requestor",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "recipient",
          foreignField: "_id",
          as: "recipient",
        },
      },
      {
        $unwind: "$requestor",
      },
      {
        $unwind: "$recipient",
      },
      {
        $project: {
          user: {
            $cond: {
              if: { $eq: [userId, "$requestor._id"] },
              then: "$recipient",
              else: "$requestor",
            },
          },
        },
      },
      {
        $project: {
          _id: "$user._id",
          name: "$user.name",
          email: "$user.email",
          lastActive: "$user.lastActive",
          isActiveNow: "$user.isActiveNow",
          avatar: "$user.avatar",
        },
      },
    ]);
    return results;
  }
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
  async function getCurrentUserFriends(userId) {
    const friends = await FriendRequest.find({
      $or: [{ requestor: userId }, { recipient: userId }],
      status: "accepted",
    }).select("_id");
    return friends;
  }
  return Object.freeze({
    createFriendRequest,
    getFriendRequests,
    getFriendRequestByUserAndFriendUserId,
    getCurrentUserAllFriendsRepo,
    findFriendRequestByIdOrError,
    getCurrentUserFriends,
  });
}

module.exports = friendRequestRepository;
