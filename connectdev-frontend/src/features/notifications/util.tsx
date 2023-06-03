import { NotificationsEntity } from "./interfaces"

export function notificationTodayFilter(notification: NotificationsEntity) {
  const date = new Date(notification.createdAt)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const todayDate = new Date(Date.now())
  const todayYear = todayDate.getFullYear()
  const todayMonth = todayDate.getMonth()
  const todayDay = todayDate.getDate()
  return (
    new Date(year, month, day).getTime() ===
    new Date(todayYear, todayMonth, todayDay).getTime()
  )
}

export function notificationOlderFilter(notification: NotificationsEntity) {
  const date = new Date(notification.createdAt)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const todayDate = new Date(Date.now())
  const todayYear = todayDate.getFullYear()
  const todayMonth = todayDate.getMonth()
  const todayDay = todayDate.getDate()
  return (
    new Date(year, month, day).getTime() !==
    new Date(todayYear, todayMonth, todayDay).getTime()
  )
}
