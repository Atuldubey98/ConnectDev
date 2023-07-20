import { ClockLoader } from "react-spinners"
import banner from "../../assets/banner.svg"
export default function FullLoading() {
  return (
    <main
      style={{
        minHeight: "80svh",
        flexDirection : "column",
      }}
      className="d-flex-center"
    >
      <img width={330} height={330} src={banner} alt="loading indi" />
      <ClockLoader color="var(--secondary-color)" />
    </main>
  )
}
