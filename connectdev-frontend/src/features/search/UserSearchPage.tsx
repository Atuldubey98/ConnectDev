import { MdOutlineExpandMore } from "react-icons/md"
import { useParams } from "react-router-dom"
import ButtonWithIcon from "../common/ButtonWithIcon"
import "./UserSearchPage.css"
import UsersSearchedList from "./UsersSearchedList"
import useSearchUsers from "./useSearchUsers"
export default function UserSearchPage() {
  const { search: searchParams } = useParams()
  const search: string = searchParams || ""
  const { users, showMoreBtn, onPageIncrement } = useSearchUsers(search)
  return (
    <main className="user__searchPage">
      <div className="user__searchWrapper">
        <UsersSearchedList users={users} />
        {showMoreBtn ? (
          <div className="d-flex-center">
            <ButtonWithIcon onClick={onPageIncrement}>
              <MdOutlineExpandMore /> <span>Show more</span>
            </ButtonWithIcon>
          </div>
        ) : null}
      </div>
    </main>
  )
}
