import classNames from "classnames"
import { formatDistanceToNow } from "date-fns"
import { LegacyRef, forwardRef } from "react"
import "./NotificationComp.css"
import { NotificationsEntity } from "./interfaces"
export type NotificationCompProps = {
  notification: NotificationsEntity
  openCommentNotificationAndNavigate(href: string, notificationId: string): void
}
const NotificationComp = forwardRef(
  (props: NotificationCompProps, ref: LegacyRef<HTMLLIElement>) => {
    const { notification, openCommentNotificationAndNavigate } = props
    function onClick() {
      openCommentNotificationAndNavigate(notification.href, notification._id)
    }

    return (
      <li
        onClick={onClick}
        ref={ref}
        className={classNames("notification", {
          notification__read: notification.read,
        })}
      >
        <p>{notification.message}</p>
        <p>{formatDistanceToNow(new Date(notification.createdAt || ""), { addSuffix: true })}</p>
      </li>
    )
  },
)
export default NotificationComp
