import { useAppSelector } from "../../app/hooks"
import Banner from "./Banner"
import "./Header.css"
import HeaderLinks from "./HeaderLinks"
import ProfileSection from "./ProfileSection"
export default function Header() {
  const { user } = useAppSelector((state) => state.login)
  return (
    <header className="d-flex-center">
      <Banner />
      {user ? (
        <>
          <HeaderLinks />
          <ProfileSection name={user.name} />
        </>
      ) : null}
    </header>
  )
}
