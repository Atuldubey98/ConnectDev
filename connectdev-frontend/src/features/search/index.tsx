import { TbSearchOff } from "react-icons/tb"
import FullLoading from "../common/FullLoading"
import Notfound from "../common/Notfound"
import FilterComp from "../posts/FilterComp"
import PeopleList from "./PeopleList"
import PostsList from "./PostsList"
import "./SearchPage.css"
import useSearch from "./useSearch"
import Container from "../common/Container"
export default function SearchPage() {
  const { usersResponse, postsResponse, usersLoading, postsLoading } =
    useSearch()

  return usersLoading || postsLoading ? (
    <FullLoading />
  ) : (
    <Container>
      <main>
        <FilterComp />
        <div className="search__wrapper">
          <PeopleList usersResponse={usersResponse} />
          <PostsList postsResponse={postsResponse} />
        </div>
        {usersResponse &&
        postsResponse &&
        usersResponse.users?.length === 0 &&
        postsResponse.posts?.length === 0 ? (
          <Notfound icon={TbSearchOff} message="Post or User Not found" />
        ) : null}
      </main>
    </Container>
  )
}
