import banner from "../../assets/banner.svg"
import { Link } from "react-router-dom"
export default function Banner() {
  return (
    <div className="banner d-flex-center">
      <img src={banner} alt="" width={32} />
      <Link to={"/"}>
        <h1>Devconnect</h1>
      </Link>
    </div>
  )
}
