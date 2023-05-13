import { Link } from "react-router-dom"
import banner from "../../assets/banner.svg"
import "./LandingPage.css"
import { SlLogin } from "react-icons/sl"
import { BiUserPlus } from "react-icons/bi"
import { useAppSelector } from "../../app/hooks"
import { AiOutlineHome } from "react-icons/ai"

export default function LandingPage() {
  const { user } = useAppSelector((state) => state.login)
  return (
    <main className="landing__page d-flex-center">
      <section>
        <div className="landing__back">
          <div className="landing__banner d-flex-center">
            <img src={banner} alt="" /> <h1>Devconnect</h1>
          </div>
          <p>Social Media application for developers</p>
        </div>
        <div className="landing__btns d-flex-center">
          {user ? (
            <Link to={"/posts"} className="landign__btn d-flex-center">
              <AiOutlineHome />
              <span>Posts</span>
            </Link>
          ) : (
            <>
              <Link to={"/login"} className="landign__btn d-flex-center">
                <SlLogin />
                <span>Login</span>
              </Link>
              <Link to={"/register"} className="landign__btn d-flex-center">
                <BiUserPlus />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
