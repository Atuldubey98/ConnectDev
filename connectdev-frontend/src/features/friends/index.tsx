import { ChangeEventHandler, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Input from "../common/Input"
import FriendRequest from "./FriendRequest"
import "./FriendsPage.css"
import { Friend, createContactAction, loadFriendsAction } from "./friendsSlice"
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
  const filterFriends = (friend: Friend): boolean =>
    friend.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !==
      -1 ||
    friend.email.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !==
      -1 ||
    filter === ""
  const onMessageClick = (friend: Friend) => {
    appDispatch(createContactAction(friend._id, navigateToChatForContact))
  }
  const navigate = useNavigate()
  const navigateToChatForContact = (contactId: string) => {
    navigate(`/chats/${contactId}`)
  }
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
          {friends.filter(filterFriends).map((friend) => (
            <FriendRequest
              onMessageClick={onMessageClick}
              key={friend._id}
              friend={friend}
            />
          ))}
        </ul>
      </div>
    </main>
  )
}
