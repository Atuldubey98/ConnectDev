const FriendRequest = require("../../models/FriendRequest");
const User = require("../../models/User");
const {
  createFriendRequest,
  getFriendRequests,
  getFriendRequestByUserAndFriendUserId,
  getCurrentUserAllFriendsRepo,
  findFriendRequestByIdOrError,
} = require("../repository/friendRequestRepository")();
const ErrorHandler = require("../../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
exports.createFriendRequest = catchAsyncErrors(async (req, res, next) => {
  const friendUserId =
    typeof req.body.friendUserId === "string" ? req.body.friendUserId : "";
  if (!friendUserId) {
    throw new ErrorHandler(400, "PAYLOAD_ERROR");
  }
  const friend = await User.findById(friendUserId);
  if (!friend) {
    throw new ErrorHandler(400, "FRIEND_USERID_NOT_FOUND");
  }
  const userId = req.user._id;
  const requestExists = await getFriendRequestByUserAndFriendUserId(
    userId,
    friendUserId
  );
  if (requestExists) {
    return res.status(201).send(requestExists);
  }

  if (friendUserId === userId) throw new ErrorHandler(400, "PAYLOAD_ERROR");

  const friendRequest = await createFriendRequest({
    requestor: userId,
    recipient: friendUserId,
    status: "requested",
  });
  return res.status(201).send(friendRequest);
});

exports.getAllFriendRequestsForCurrentUser = catchAsyncErrors(
  async (req, res, next) => {
    const userId = req.user._id;
    const friendRequests = await getFriendRequests(userId);
    return res.status(200).send(friendRequests);
  }
);

exports.acceptFriendRequest = catchAsyncErrors(async (req, res, next) => {
  const friendRequestId =
    typeof req.body.friendRequestId === "string"
      ? req.body.friendRequestId
      : "";
  if (!friendRequestId) {
    throw new ErrorHandler("PAYLOAD_ERROR", 400);
  }

  const friendRequest = await FriendRequest.findById(friendRequestId);
  if (!friendRequest || friendRequest.status !== "requested") {
    throw new ErrorHandler("PAYLOAD_ERROR", 400);
  }
  const friendRequestUpdated = await FriendRequest.findByIdAndUpdate(
    friendRequestId,
    { status: "accepted" },
    {
      new: true,
    }
  ).populate({
    path: "recipient",
    select: "name _id",
  });
  return res.status(200).send(friendRequestUpdated);
});

exports.cancelFriendRequestByCurrentUser = catchAsyncErrors(
  async (req, res, next) => {
    const friendRequestId =
      typeof req.params.friendRequestId === "string"
        ? req.params.friendRequestId
        : "";
    if (!friendRequestId) {
      throw new ErrorHandler("PAYLOAD_ERROR", 400);
    }
    const friendRequest = await findFriendRequestByIdOrError(friendRequestId);
    if (friendRequest.status !== "requested") {
      throw new ErrorHandler("PAYLOAD_ERROR", 400);
    }
    await FriendRequest.findByIdAndDelete(friendRequestId, {
      status: "rejected",
    });
    return res.status(204).send("deleted");
  }
);
exports.getFriendRequestCurrentStatus = catchAsyncErrors(
  async (req, res, next) => {
    const userId = req.user._id;
    const friendUserId =
      typeof req.params.friendUserId === "string"
        ? req.params.friendUserId
        : "";
    if (!friendUserId) {
      throw new ErrorHandler("PAYLOAD_ERROR", 400);
    }
    const request = await getFriendRequestByUserAndFriendUserId(
      userId,
      friendUserId
    );

    return res.status(200).json(request);
  }
);

exports.getCurrentUserAllFriends = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const friends = await getCurrentUserAllFriendsRepo(userId);
  return res.status(200).json(friends);
});
