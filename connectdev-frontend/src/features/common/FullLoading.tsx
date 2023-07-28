import { ClockLoader } from "react-spinners"
import bannerBlack from "../../assets/bannerBlack.svg"
export default function FullLoading() {
  return (
    <main
      style={{
        minHeight: "80svh",
        flexDirection: "column",
      }}
      className="d-flex-center"
    >
      <img width={330} height={330} src={bannerBlack} alt="loading indi" />
      <ClockLoader color="var(--secondary-color)" />
    </main>
  )
}
