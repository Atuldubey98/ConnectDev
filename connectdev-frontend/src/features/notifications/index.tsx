import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import useInfiniteScroll from "../common/useInfiniteScroll"
import "./NotificationsPage.css"
import { NotificationsEntity } from "./interfaces"
import {
  loadFriendRequestsAction,
  loadNotificationsAction,
  setNotificationsIdle,
  updateReadNotificationAction,
} from "./notificationSlice"

import NotificationComp from "./NotificationComp"
import { useNavigate } from "react-router-dom"
import ClockLoader from "react-spinners/ClockLoader"
import FriendRequestAcceptDeny from "./FriendRequestAcceptDeny"
import { FriendRequestEntity } from "../profile/interfaces"
import { IoNotificationsOffSharp } from "react-icons/io5"
import Container from "../common/Container"
export default function NotificationsPage() {
  const {
    notificationsResponse,
    hasNextNotification,
    notificationStatus,
    friendRequests,
  } = useAppSelector((state) => state.notification)
  const loading: boolean = notificationStatus === "loading"
  const notifications: NotificationsEntity[] =
    notificationsResponse?.notifications || []
  const { setElement, page } = useInfiniteScroll(hasNextNotification)
  const appDispatch = useAppDispatch()
  useEffect(() => {
    appDispatch(loadNotificationsAction(page))
    appDispatch(loadFriendRequestsAction())
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
  const requests: FriendRequestEntity[] = friendRequests || []
  return (
    <Container>
      <main>
        <div className="notification__requestsWrapper">
          {requests.length === 0 ? null : (
            <>
              <h2>Requests</h2>
              <ul className="requests">
                {requests.map((request) => (
                  <FriendRequestAcceptDeny
                    request={request}
                    key={request._id}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="notifications__pageWrapper">
          <h2>Notifications </h2>
          {notifications.length === 0 ? (
            <div className="d-flex-center notification__null">
              <IoNotificationsOffSharp size={100} color={"brown"} />
              <h3>No Notifications for now</h3>
              <div className="d-flex-center">
                <ClockLoader loading={loading} color="var(--secondary-color)" />
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </main>
    </Container>
  )
}
