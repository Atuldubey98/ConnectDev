import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import useInfiniteScroll from "../common/useInfiniteScroll"
import "./NotificationsPage.css"
import { NotificationsEntity } from "./interfaces"
import {
  loadNotificationsAction,
  setNotificationsIdle,
  updateReadNotificationAction,
} from "./notificationSlice"

import NotificationComp from "./NotificationComp"
import { useNavigate } from "react-router-dom"
import ClockLoader from "react-spinners/ClockLoader"
export default function NotificationsPage() {
  const { notificationsResponse, hasNextNotification, notificationStatus } =
    useAppSelector((state) => state.notification)
  const loading: boolean = notificationStatus === "loading"
  const notifications: NotificationsEntity[] =
    notificationsResponse?.notifications || []
  const { setElement, page } = useInfiniteScroll(hasNextNotification)
  const appDispatch = useAppDispatch()
  useEffect(() => {
    appDispatch(loadNotificationsAction(page))
  }, [page])
  useEffect(() => {
    return () => {
      appDispatch(setNotificationsIdle())
    }
  }, [])
  const navigate = useNavigate()
  function navigateToPost(href: string) {
    navigate(href)
  }
  function openCommentNotificationAndNavigate(
    href: string,
    notificationId: string,
  ) {
    appDispatch(
      updateReadNotificationAction(notificationId, href, navigateToPost),
    )
  }
  return (
    <main>
      <div className="notifications__pageWrapper">
        <h2>Notifications</h2>
        <ul className="notifications">
          {notifications.map((notification, index: number) => {
            return index === notifications.length - 2 ? (
              <NotificationComp
                openCommentNotificationAndNavigate={
                  openCommentNotificationAndNavigate
                }
                ref={setElement}
                key={notification._id}
                notification={notification}
              />
            ) : (
              <NotificationComp
                openCommentNotificationAndNavigate={
                  openCommentNotificationAndNavigate
                }
                key={notification._id}
                notification={notification}
              />
            )
          })}
        </ul>
        <div className="d-flex-center">
          <ClockLoader loading={loading} color="var(--accent-color)" />
        </div>
      </div>
    </main>
  )
}
