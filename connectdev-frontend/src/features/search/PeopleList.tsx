import { MdOutlineExpandMore } from "react-icons/md"
import { useParams } from "react-router-dom"
import LinkButton from "../common/LinkButton"
import "./PeopleList.css"
import UsersSearchedList from "./UsersSearchedList"
import { IUsersResponse } from "./interfaces"

type PeopleListProps = {
  usersResponse: IUsersResponse | null
}
export default function PeopleList({ usersResponse }: PeopleListProps) {
  const { search: searchParams } = useParams()
  const search = searchParams || ""
  return usersResponse &&
    usersResponse.users &&
    usersResponse.users.length > 0 ? (
    <section className="people__listSearched">
      <h2>People</h2>
      <UsersSearchedList users={usersResponse.users} />
      {usersResponse.totalDocs > 10 ? (
        <div className="d-flex-center">
          <LinkButton label="Show more people" to={`/search/users/${search}`}>
            <MdOutlineExpandMore />
          </LinkButton>
        </div>
      ) : null}
    </section>
  ) : null
}
