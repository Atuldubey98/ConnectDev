const Notification = require("../../models/Notification");
const {
  getPaginationFilter,
  getNotificationId,
  getNotificationIds,
} = require("../../utils/sanitize");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.getAllNotificationsByUserId = catchAsyncErrors(
  async (req, res, next) => {
    const { limit, page } = getPaginationFilter(req.query);
    const userId = req.user._id;
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
    const notifications = await Notification.paginate(
      { user: userId },
      options
    );
    return res.status(200).send(notifications);
  }
);
exports.getCountNotificationRead = catchAsyncErrors(async (req, res, next) => {
  
  const unreadCount = await Notification.count({
    read: false,
    user: req.user._id,
  });
  return res.status(200).json(unreadCount);
});
exports.updateReadNotificationByUser = catchAsyncErrors(
  async (req, res, next) => {
    const notificationId = getNotificationId(req.params);
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
  const notificationIds = getNotificationIds(req.body);
  await Notification.deleteMany({
    _id: { $in: notificationIds },
    user: req.user._id,
  });
  return res.status(204);
});
