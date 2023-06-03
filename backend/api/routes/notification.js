const { isAuthenticated } = require("../../utils/auth");
const { Router } = require("express");
const {
  getAllNotificationsByUserId,
  updateReadNotificationByUser,
  deleteNotificationsByIds,
  getCountNotificationRead,
} = require("../controller/notificationController");
const notificationRouter = Router();
notificationRouter.get("/", isAuthenticated, getAllNotificationsByUserId);
notificationRouter.get(
  "/:notificationId",
  isAuthenticated,
  getCountNotificationRead
);
notificationRouter.patch(
  "/:notificationId",
  isAuthenticated,
  updateReadNotificationByUser
);
notificationRouter.delete("/", isAuthenticated, deleteNotificationsByIds);
module.exports = notificationRouter;
