import { ChangeEventHandler, useEffect, useState } from "react"
import { AiOutlineSend } from "react-icons/ai"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Input from "../common/Input"
import LinkButton from "../common/LinkButton"
import UserFriendDetail from "../notifications/UserFriendDetail"
import "./FriendsPage.css"
import { loadFriendsAction } from "./friendsSlice"
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
                friend.name
                  .toLocaleLowerCase()
                  .indexOf(filter.toLocaleLowerCase()) !== -1 ||
                friend.email
                  .toLocaleLowerCase()
                  .indexOf(filter.toLocaleLowerCase()) !== -1 ||
                filter === "",
            )
            .map((friend) => (
              <li key={friend._id} className="friend__request">
                <UserFriendDetail key={friend._id} user={friend} />
                <LinkButton to={`/chats/${friend._id}`} label="Message">
                  <AiOutlineSend />
                </LinkButton>
              </li>
            ))}
        </ul>
      </div>
    </main>
  )
}
