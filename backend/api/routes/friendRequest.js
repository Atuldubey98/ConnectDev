const { Router } = require("express");
const { isAuthenticated } = require("../../utils/auth");
const {
  createFriendRequest,
  getAllFriendRequestsForCurrentUser,
  acceptFriendRequest,
  getFriendRequestCurrentStatus,
  cancelFriendRequestByCurrentUser,
} = require("../controller/friendRequestController");
const friendRequestRouter = Router();

friendRequestRouter.post("/", isAuthenticated, createFriendRequest);
friendRequestRouter.get(
  "/",
  isAuthenticated,
  getAllFriendRequestsForCurrentUser
);
friendRequestRouter.post("/accept", isAuthenticated, acceptFriendRequest);
friendRequestRouter.get(
  "/:friendUserId",
  isAuthenticated,
  getFriendRequestCurrentStatus
);
friendRequestRouter.delete(
  "/:friendRequestId",
  isAuthenticated,
  cancelFriendRequestByCurrentUser
);
module.exports = friendRequestRouter;
