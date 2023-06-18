const ErrorHandler = require("./errorhandler");

function sanitizeFilterUtil(filter) {
  let sanitized = {};
  if (!filter || typeof filter === "string" || !filter.user) {
    return sanitized;
  }
  sanitized = { ...filter };
  return sanitized;
}

function isJson(filter) {
  try {
    JSON.parse(filter);
    return true;
  } catch (error) {
    return false;
  }
}

function getPaginationFilter(query) {
  const page =
    typeof query.page === "string" && !isNaN(Number(query.page))
      ? Number(query.page)
      : 1;
  const limit =
    typeof query.limit === "string" && !isNaN(Number(query.limit))
      ? Number(query.limit)
      : 10;
  return { limit, page };
}
function getNotificationId(params) {
  const notificationId =
    typeof params.notificationId === "string" ? params.notificationId : "";
  if (!notificationId) {
    throw new ErrorHandler("Please specify the notification id", 400);
  }
  return notificationId;
}
function getNotificationIds(body) {
  const notificationIds = Array.isArray(body.notificationIds)
    ? body.notificationIds
    : [];
  const isNotificationIdsString = notificationIds.some(
    (n) => typeof n !== "string"
  );
  if (isNotificationIdsString) {
    throw new ErrorHandler("Please specify the notification id", 400);
  }
  return notificationIds;
}
module.exports = {
  sanitizeFilterUtil,
  getPaginationFilter,
  getNotificationId,
  getNotificationIds,
};
