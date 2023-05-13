import { useLocation } from "react-router-dom"
import HeaderLink from "./HeaderLink"
import "./HeaderLinks.css"
export type HeaderLinkType = {
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
