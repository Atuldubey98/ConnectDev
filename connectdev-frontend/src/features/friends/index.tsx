import { ChangeEventHandler, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import "./FriendsPage.css"
import { loadFriendsAction } from "./friendsSlice"
import Input from "../common/Input"
import UserFriendDetail from "../notifications/UserFriendDetail"
export default function FriendsPage() {
  const { status, friends: friendsList } = useAppSelector(
    (state) => state.friends,
  )
  const loading: boolean = status === "loading"
  const appDispatch = useAppDispatch()
  const [filter, setFilter] = useState<string>("")
  useEffect(() => {
    appDispatch(loadFriendsAction())
  }, [])
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilter(e.currentTarget.value)
  }
  const friends = friendsList || []
  return (
    <main className="friends__page">
      <div className="friends__wrapper">
        <h2>Friends ({friends.length})</h2>
        <section className="friends__search">
          <form>
            <Input
              value={filter}
              onChange={onChange}
              label="Search"
              name="search"
              type="search"
            />
          </form>
        </section>
        <ul className="friends">
          {friends
            .filter(
              (friend) =>
                friend.name.toLocaleLowerCase().indexOf(filter) !== -1 ||
                friend.email.toLocaleLowerCase().indexOf(filter) !== -1 ||
                filter === "",
            )
            .map((friend) => (
              <li key={friend._id} className="friend__request">
                <UserFriendDetail key={friend._id} user={friend} />
              </li>
            ))}
        </ul>
      </div>
    </main>
  )
}
