import { Link, useLocation } from "react-router-dom"
import "./HeaderLinks.css"
import classNames from "classnames"
type HeaderLinkType = {
  to: string
  label: string
}
export default function HeaderLinks() {
  const headerLinks: HeaderLinkType[] = [
    { to: "/posts", label: "Posts" },
    { to: "/chats", label: "Chats" },
    { to: "/profile", label: "Profile" },
  ]
  const location = useLocation()
  const activeLink = location.pathname
  return (
    <ul className="header__links d-flex-center">
      {headerLinks.map((headerLink) => (
        <HeaderLink
          key={headerLink.label}
          activeLink={activeLink}
          headerLink={headerLink}
        />
      ))}
    </ul>
  )
}
function HeaderLink({
  headerLink,
  activeLink,
}: {
  headerLink: HeaderLinkType
  activeLink: string
}): JSX.Element {
  return (
    <li className={classNames({ active: activeLink === headerLink.to })}>
      <Link to={headerLink.to}>{headerLink.label}</Link>
    </li>
  )
}
