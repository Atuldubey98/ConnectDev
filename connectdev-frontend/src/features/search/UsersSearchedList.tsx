import { IUserDetails } from "../posts/interfaces"
import People from "./People"
type UsersSearchedListProps = {
  users: IUserDetails[]
}
export default function UsersSearchedList(props: UsersSearchedListProps) {
  const { users } = props
  return (
    <ul className="people__list">
      {users.map((user) => (
        <People user={user} key={user._id} />
      ))}
    </ul>
  )
}
