import { useAppSelector } from "../../app/hooks"
import LandingBack from "./LandingBack"
import LandingBtns from "./LandingBtns"
import "./LandingPage.css"

export default function LandingPage() {
  const { user } = useAppSelector((state) => state.login)
  return (

    <main className="landing__page d-flex-center">
      <section>
        <LandingBack />
        <LandingBtns user={user} />
      </section>
    </main>
  )
}
