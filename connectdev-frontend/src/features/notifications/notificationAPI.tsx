import instance from "../../axios"

export function getNotificationsByUser(page: number) {
  return instance.get("/api/notifications", {
    params: {
      page,
    },
  })
}
export function updateReadNotification(notificationId: string) {
  return instance.patch(`/api/notifications/${notificationId}`)
}
