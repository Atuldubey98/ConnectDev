const Notification = require("../../models/Notification");
const ErrorHandler = require("../../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.getAllNotificationsByUserId = catchAsyncErrors(
  async (req, res, next) => {
    const userId = req.user._id;
    const page =
      typeof req.query.page === "string" && !isNaN(Number(req.query.page))
        ? Number(req.query.page)
        : 1;
    const limit =
      typeof req.query.limit === "string" && !isNaN(Number(req.query.limit))
        ? Number(req.query.limit)
        : 10;
    if (!userId) {
      next(new ErrorHandler("User not found", 400));
      return;
    }
    const query = { user: userId };
    const options = {
      page,
      limit,
      sort: {
        createdAt: -1,
      },
      customLabels: {
        totalDocs: "totalCount",
        docs: "notifications",
        nextPage: "nextPage",
        prevPage: "prevPage",
      },
    };
    const notifications = await Notification.paginate(query, options);
    return res.status(200).send(notifications);
  }
);
exports.getCountNotificationRead = catchAsyncErrors(async (req, res, next) => {
  const notificationId =
    typeof req.params.notificationId === "string"
      ? req.params.notificationId
      : "";
  if (!notificationId) {
    next(new ErrorHandler("Please specify the notification id", 400));
    return;
  }
  const unreadCount = await Notification.count({
    read: false,
    user: req.user._id,
  });
  return res.status(200).json(unreadCount);
});
exports.updateReadNotificationByUser = catchAsyncErrors(
  async (req, res, next) => {
    const notificationId =
      typeof req.params.notificationId === "string"
        ? req.params.notificationId
        : "";
    if (!notificationId) {
      next(new ErrorHandler("Please specify the notification id", 400));
      return;
    }
    await Notification.findByIdAndUpdate(
      notificationId,
      {
        read: true,
      },
      { new: true }
    );
    const updatedNotificationCount = await Notification.count({
      user: req.user._id,
      read: false,
    });
    return res.status(200).json(updatedNotificationCount);
  }
);

exports.deleteNotificationsByIds = catchAsyncErrors(async (req, res, next) => {
  const notificationIds = Array.isArray(req.body.notificationIds)
    ? req.body.notificationIds
    : [];
  const isNotificationIdsString = notificationIds.some(
    (n) => typeof n !== "string"
  );
  if (isNotificationIdsString) {
    next(new ErrorHandler("Please specify the notification id", 400));
    return;
  }
  await Notification.deleteMany({
    _id: { $in: notificationIds },
    user: req.user._id,
  });
  return res.status(204);
});
