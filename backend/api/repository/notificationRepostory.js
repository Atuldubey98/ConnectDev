const Notification = require("../../models/Notification");

function notificationRepository() {
  async function createNotification(user, href, message) {
    if (!user || !href || !message) {
      return null;
    }
    const notification = new Notification({
      user,
      href,
      message,
    });
    await notification.save();
    return notification;
  }
  return Object.freeze({
    createNotification,
  });
}

module.exports = notificationRepository;
