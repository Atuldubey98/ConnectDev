import { useAppSelector } from "../../app/hooks"
import Banner from "./Banner"
import "./Header.css"
import HeaderLinks from "./HeaderLinks"
import ProfileSection from "./ProfileSection"
export default function Header() {
  const name = useAppSelector((state) => state.login.user?.name)

  return (
    <header className="d-flex-center">
      <Banner />
      {name ? (
        <>
          <HeaderLinks />
          <ProfileSection name={name} />
        </>
      ) : null}
    </header>
  )
}
