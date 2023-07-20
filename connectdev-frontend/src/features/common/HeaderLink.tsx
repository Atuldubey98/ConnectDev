import classNames from "classnames"
import { Link } from "react-router-dom"
import { HeaderLinkType } from "./HeaderLinks"

export default function HeaderLink({
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
